import {
  getCommentByIssueId,
  createComment,
  getIssueDetail,
  createReaction,
  getIssuesList,
  createReactionForAnIssue,
  listReactionForAnIssue,
} from '@/services';

import { message } from 'antd';
const FILTERISSUE = 'FILTERISSUE';

export default {
  namespace: 'home',
  state: {
    commentList: [],
    issueDetail: '',
    issuesList: [],
    copyIssueList: [],
    likes: [],
  },
  effects: {
    *getCommentList({ payload }, { call, put }) {
      const { id } = payload;
      const { data, status } = yield call(getCommentByIssueId, id);
      if (status === 200) {
        yield put({
          type: 'save',
          payload: {
            commentList: data,
          },
        });
      }
    },

    *getIssuesList(_, { call, put }) {
      const { data } = yield call(getIssuesList);
      yield put({
        type: 'save',
        payload: {
          issuesList: data,
          copyIssueList: data,
        },
      });
    },

    *getIssueDetail({ payload }, { call, put }) {
      const { id } = payload;
      const { data, status } = yield call(getIssueDetail, id);
      if (status === 200) {
        yield put({
          type: 'save',
          payload: {
            issueDetail: data,
          },
        });
      }
    },

    *createComment({ payload }, { call, put }) {
      const { id, value } = payload;
      const { status } = yield call(createComment, id, value);
      if (status === 201) {
        yield put({
          type: 'getCommentList',
          payload: {
            id,
          },
        });
        message.success('添加成功');
        return true;
      }
    },

    *createReaction({ payload }, { call, put }) {
      const { commentId, issueId, type } = payload;
      const { status } = yield call(createReaction, commentId, type);
      if ([200, 201].includes(status)) {
        yield put({
          type: 'getCommentList',
          payload: {
            id: issueId,
          },
        });
      }
    },

    *createReactionForIssue({ payload }, { call, put }) {
      const { id } = payload;
      const { status } = yield call(createReactionForAnIssue, id);
      if ([200, 201].includes(status)) {
        yield put({
          type: 'listReactionForAnIssue',
          payload: {
            id,
          },
        });
      }
    },

    *listReactionForAnIssue({ payload }, { call, put }) {
      const { id } = payload;
      const { status, data } = yield call(listReactionForAnIssue, id);
      if (status === 200) {
        yield put({
          type: 'save',
          payload: {
            likes: data,
          },
        });
      }
    },
  },

  reducers: {
    save: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    search: (state, { payload }) => {
      const { keyword } = payload;
      const { copyIssueList = {} } = state;
      let list = [];
      if (keyword && keyword !== '') {
        const regx = new RegExp(keyword, 'i');
        list = copyIssueList.filter(article => regx.test(article.body));
      } else if (keyword === '') {
        list = copyIssueList;
      }
      return {
        ...state,
        issuesList: list,
      };
    },
    // 归类显示
    [FILTERISSUE](state, { payload }) {
      const { tag } = payload;
      const { copyIssueList = {} } = state;
      let list = [];
      if (tag && tag.length !== 0) {
        list = copyIssueList.filter(issue => {
          let hasTag = false;
          issue.labels.forEach(label => {
            if (tag.includes(String(label.id))) {
              hasTag = true;
            }
          });
          return hasTag;
        });
      } else if (tag.length === 0) {
        list = copyIssueList;
      }

      return {
        ...state,
        issuesList: list,
      };
    },
  },
};

export const filterIssue = tag => {
  return { type: `home/${FILTERISSUE}`, payload: { tag } };
};
