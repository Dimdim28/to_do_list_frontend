import { RootState } from "../redux/store";
import { Status } from "../types";

export const MOCK_OBJECT_ONE: RootState = {
  auth: {
    status: Status.SUCCESS,
    profile: {
      _id: "123456",
      createdAt: "2007 year",
      updatedAt: "2008 year",
      email: "test@gmail.com",
      token: "01032004hahathisismytoken",
      username: "DimonTheBest",
    },
    message: "",
  },
  home: {
    task: {
      tasks: [],
      status: Status.LOADING,
    },
    category: {
      categories: [
        {
          _id: "646b95736b2cb6353f4fd104",
          title: "hello",
          user: "63f6342acc86923016194255",
          color: "#d82222",
        },
        {
          _id: "646bbbaefedb212d312d0447",
          title: "lalala",
          user: "63f6342acc86923016194255",
          color: "#16a29f",
        },
      ],
      totalPages: 1,
      currentPage: 1,
      status: Status.SUCCESS,
      message: "",
    },
  },
  profile: {
    data: null,
    status: Status.LOADING,
  },
};

export const MOCK_OBJECT_TWO: RootState = {
  auth: {
    status: Status.ERROR,
    profile: null,
    message: "this is an error",
  },
  home: {
    task: {
      tasks: [],
      status: Status.LOADING,
    },
    category: {
      categories: [
        {
          _id: "646b95736b2cb6353f4fd104",
          title: "hello",
          user: "63f6342acc86923016194255",
          color: "#d82222",
        },
        {
          _id: "646bbbaefedb212d312d0447",
          title: "lalala",
          user: "63f6342acc86923016194255",
          color: "#16a29f",
        },
      ],
      totalPages: 1,
      currentPage: 1,
      status: Status.SUCCESS,
      message: "",
    },
  },
  profile: {
    data: null,
    status: Status.LOADING,
  },
};
