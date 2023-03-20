const Board = require('../models/board');
const User = require('../models/user');
const Avtivity = require('../models/include/activity');
const Workspace = require('../models/workspace');
const createError = require('http-errors');
const validator = require('validator');

const createBoard = async (req, res, next) => {
  try {
    const { workspaceId, ...restBody } = req.body;
    if (validator.isEmpty(workspaceId)) {
      throw createError(400, 'Invalid workspace id');
    }
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw createError(404, 'Workspace not found');
    }
    // if (!workspace.members.find((user) => user.userId == req.currentUser.id)) {
    //   throw createError(401, 'Not authorized to access this workspace resource.');
    // }

    const board = new Board({
      ...restBody,
      workspaceId,
      owner: req.currentUser.id,
      members: [{ userId: req.currentUser.id }],
    });
    await board.save();
    workspace.boards.push(board._id);
    await workspace.save();
    res.status(200).json({ message: 'Board created' });
  } catch (err) {
    next(err);
  }
};

const getBoards = async (req, res, next) => {
  try {
    const filter = {
      members: {
        $elemMatch: {
          userId: req.currentUser.id,
        },
      },
      ...(req.query.workspaceId && { workspaceId: req.query.workspaceId }),
    };
    const boards = await Board.find(filter).populate('workspaceId');
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
};

const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    Object.assign(board, req.body);
    await board.save();
    res.status(200).json({ message: 'Board updated' });
  } catch (err) {
    next(err);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    await board.remove();
    const workspace = await Workspace.findById(board.workspaceId);
    workspace.boards = workspace.boards.filter(
      (boardId) => boardId.toString() != board._id.toString()
    );
    await workspace.save();
    res.status(200).json({ message: 'Board deleted' });
  } catch (err) {
    next(err);
  }
};

const createList = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (member) => member.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    board.lists.push(req.body);
    const newBoard = await board.save();

    res.status(200).json(newBoard);
  } catch (err) {
    next(err);
  }
};

const updateListById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    const list = board.lists.id(req.params.listId);
    if (!list) {
      throw createError(404, 'List not found');
    }
    Object.assign(list, req.body);

    const newBoard = await board.save();
    res.status(200).json(newBoard);
  } catch (err) {
    next(err);
  }
};

const updateLists = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    board.lists = req.body;
    const newBoard = await board.save();
    res.status(200).json(newBoard);
  } catch (err) {
    next(err);
  }
};

const deleteListById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    const list = board.lists.id(req.params.listId);
    if (!list) {
      throw createError(404, 'List not found');
    }
    await list.remove();
    const newBoard = await board.save();
    res.status(200).json(newBoard);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    const list = board.lists.id(req.params.listId);
    if (!list) {
      throw createError(404, 'List not found');
    }
    list.tasks.push(req.body);
    const newBoard = await board.save();
    res.status(200).json(newBoard);
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    for (const list of board.lists) {
      const task = list.tasks.id(req.params.taskId);
      if (task) {
        Object.assign(task, req.body);
        const newBoard = await board.save();
        return res.status(200).json(newBoard);
      }
    }

    throw createError(404, 'Task not found');
    // const list = board.lists.id(req.params.listId);
    // if (!list) {
    //   throw createError(404, 'List not found');
    // }
    // const task = list.tasks.id(req.params.taskId);
    // if (!task) {
    //   throw createError(404, 'Task not found');
    // }
    // Object.assign(task, req.body);
    // const newBoard = await board.save();
    // res.status(200).json(newBoard);
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    const list = board.lists.id(req.params.listId);
    if (!list) {
      throw createError(404, 'List not found');
    }
    const task = list.tasks.id(req.params.taskId);
    if (!task) {
      throw createError(404, 'Task not found');
    }
    await task.remove();
    const newBoard = await board.save();
    res.status(200).json(newBoard);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    for (const list of board.lists) {
      const task = list.tasks.id(req.params.taskId);
      if (task) {
        const members = [...task.members];
        const newMembers = [];
        if (members.length > 0) {
          members.user = {};
          for (const member of members) {
            const findMember = await User.findById(member.userId);
            if (!findMember) {
              throw createError(404, 'Member not found');
            }
            newMembers.push({
              ...member.toObject(),
              user: {
                email: findMember.email,
                username: findMember.username,
                avatar: findMember.avatar,
                name: findMember.name,
              },
            });
          }
        }
        console.log(newMembers);
        return res.status(200).json({
          ...task.toObject(),
          members: newMembers,
        });
      }
    }
    throw createError(404, 'Task not found');
  } catch (error) {
    next(error);
  }
};

const createTaskActivity = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      throw createError(404, 'Board not found');
    }
    if (
      !board.members.find(
        (user) => user.userId.toString() == req.currentUser.id.toString()
      )
    ) {
      throw createError(401, 'Not authorized to access this board resource.');
    }
    const { comment, attachments } = req.body;
    const newActivity = new Avtivity({
      userId: req.currentUser.id,
      comment: comment,
      attachments: attachments || [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  createList,
  updateListById,
  updateLists,
  deleteListById,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskById,
};
