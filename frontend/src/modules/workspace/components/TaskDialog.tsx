import styled from 'styled-components';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Portal } from 'react-portal';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery } from '../core/workspace-api';

type TaskDialogProps = {};
export const TaskDialog = (props: TaskDialogProps) => {
  const { boardId, taskId, wsId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetTaskByIdQuery({
    boardId: boardId as string,
    taskId: taskId as string,
  });

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
                    .col-xs-12 .col-md-8
                  </Col>
                  <Col xs={6} md={3}>
                    <StyledActions>
                      <StyledAction>
                        <i className="bi bi-pen"></i>
                        Edit
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

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledAction = styled.button`
  background-color: ${({ theme }) => theme.grayscale[200]};
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
