import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Portal } from 'react-portal';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useUpdateTaskMutation } from '../core/workspace-api';
import { TextEditor } from '../../../components/partials';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';

export const TaskDialog = () => {
  const { boardId, taskId, wsId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetTaskByIdQuery({
    boardId: boardId as string,
    taskId: taskId as string,
  });
  const [updateTask] = useUpdateTaskMutation();

  const [showTextEditor, setShowTextEditor] = useState<boolean>(false);
  const [textEditorContent, setTextEditorContent] = useState<string>('');

  useEffect(() => {
    if (data && data.description) {
      setTextEditorContent(data.description);
    }

    return () => {
      setTextEditorContent('');
    };
  }, []);

  const onEditorChange = async (newContent: string) => {
    setTextEditorContent(newContent);
  };
  const onEditorBlur = (newContent: string) => {
    // setTextEditorContent(newContent);
    // console.log('Content was updated with onBlur: ', newContent);
    updateTask({
      boardId: boardId as string,
      taskId: taskId as string,
      data: {
        description: newContent,
      },
    })
      .then(() => {
        refetch();
        setShowTextEditor(false);
        toast.success('Task updated');
      })
      .catch(() => {
        setShowTextEditor(false);
        toast.error("Can't update task");
      });
  };

  const handleClose = () => {
    navigate(`/ws/${wsId}/b/${boardId}`);
  };

  return (
    <Portal node={document && document.getElementById('layout-portal')}>
      <StyledModal show={!!taskId} onHide={handleClose} animation={false} size="lg">
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <p>Loading..</p>
          </div>
        )}
        {!data && !isLoading && <div>Task not found</div>}
        {data && data._id && (
          <>
            <StyledModalHeader closeButton>
              <StyledModalTitle>{data.name}</StyledModalTitle>
            </StyledModalHeader>
            <StyledModalBody>
              <Container>
                <Row>
                  <Col xs={12} md={9}>
                    <StyledSection>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <div className="fs-5 fw-semibold">Description</div>
                        {data.description && !showTextEditor && (
                          <div className="ms-auto">
                            <button className="btn btn-link btn-sm text-muted" onClick={() => setShowTextEditor(true)}>
                              Edit
                            </button>
                          </div>
                        )}

                        {showTextEditor && (
                          <div className="ms-auto">
                            <button onClick={() => setShowTextEditor(false)} className="btn btn-success btn-sm me-2">
                              Save
                            </button>
                            <button onClick={() => setShowTextEditor(false)} className="btn btn-link btn-sm text-dark">
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      {!data.description && !showTextEditor && (
                        <StyledAction onClick={() => setShowTextEditor((prev) => !prev)}>
                          Add a description to this task
                        </StyledAction>
                      )}
                      {data.description && !showTextEditor && (
                        <div className='p-4 bg-light'>
                          <div className="mb-2">{parse(data.description)}</div>
                        </div>
                      )}
                      {showTextEditor && (
                        <TextEditor
                          content={textEditorContent}
                          onBlur={onEditorBlur}
                          onChange={onEditorChange}
                          placeholder="Type here .."
                        />
                      )}
                    </StyledSection>

                    <StyledSection>
                      {/* Attachments */}
                      <div className="d-flex flex-column my-2">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="fs-5 fw-semibold">Attachments</div>
                          <div className="ms-auto">
                            <button className="btn btn-link btn-sm text-muted">View all</button>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <StyledAction>
                            <div className="ms-2">
                              <div className="fw-semibold">File name</div>
                              <div className="text-muted">File size</div>
                            </div>
                          </StyledAction>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="d-flex flex-column my-2">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="fs-5 fw-semibold">Activities</div>
                          <div className="ms-auto">
                            <button className="btn btn-link btn-sm text-muted">View all</button>
                          </div>
                        </div>
                      </div>
                    </StyledSection>
                  </Col>
                  <Col xs={6} md={3}>
                    <StyledActions>
                      <StyledAction>
                        <i className="bi bi-person"></i>
                        Join
                      </StyledAction>
                      <StyledAction>
                        <i className="bi bi-pen"></i>
                        Edit
                      </StyledAction>

                      <StyledAction>
                        <i className="bi bi-trash2"></i>
                        Delete
                      </StyledAction>
                    </StyledActions>
                  </Col>
                </Row>
              </Container>
            </StyledModalBody>
          </>
        )}

        <Modal.Footer></Modal.Footer>
      </StyledModal>
    </Portal>
  );
};

const StyledModal = styled(Modal)``;

const StyledModalHeader = styled(Modal.Header)`
  border-bottom: none;
  background-color: ${({ theme }) => theme.grayscale[200]};
`;

const StyledModalTitle = styled(Modal.Title)``;

const StyledModalBody = styled(Modal.Body)``;

const StyledSection = styled.section`
  padding: 0.625rem 0.375rem;
  margin: 0.375rem 0;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
const StyledAction = styled.button`
  background-color: ${({ theme }) => theme.grayscale[200]};
  color: ${({ theme }) => theme.grayscale[800]};
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.grayscale[300]};
  }
`;
