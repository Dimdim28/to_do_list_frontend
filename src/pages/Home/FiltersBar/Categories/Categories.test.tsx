import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import Categories from "./Categories";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Categories", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      home: {
        category: {
          categories: [
            {
              _id: "1",
              title: "Category 1",
              color: "#ffffff",
            },
            {
              _id: "2",
              title: "Category 2",
              color: "#ff0000",
            },
          ],
          status: "success",
          currentPage: 1,
          totalPages: 1,
          error: null,
        },
      },
    });
  });

  test("should render categories", () => {
    render(
      <Provider store={store}>
        <Categories
          isForTask={false}
          activeCategories={[]}
          setActiveCategories={() => {}}
          taskFetchingParams={{}}
          fetchTasks={() => {}}
        />
      </Provider>
    );

    const category1 = screen.getByText("Category 1");
    const category2 = screen.getByText("Category 2");

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });

  test("should render 'no categories' message when there are no categories", () => {
    store = mockStore({
      home: {
        category: {
          categories: [],
          status: "success",
          currentPage: 1,
          totalPages: 1,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <Categories
          isForTask={false}
          activeCategories={[]}
          setActiveCategories={() => {}}
          taskFetchingParams={{}}
          fetchTasks={() => {}}
        />
      </Provider>
    );

    const noCategoriesMessage = screen.getByText("you have no categories");

    expect(noCategoriesMessage).toBeInTheDocument();
  });

  test("should render 'loading' preloader when categories are being fetched", () => {
    store = mockStore({
      home: {
        category: {
          categories: [],
          status: "loading",
          currentPage: 1,
          totalPages: 1,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <Categories
          isForTask={false}
          activeCategories={[]}
          setActiveCategories={() => {}}
          taskFetchingParams={{}}
          fetchTasks={() => {}}
        />
      </Provider>
    );

    const preloader = screen.getByTestId("preloader");

    expect(preloader).toBeInTheDocument();
  });
});
