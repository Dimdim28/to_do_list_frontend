import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";

import CategoryForm from "./CategoryForm";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("CategoryForm", () => {

  test("should render category form with initial values", () => {

    const initialState = {
        auth: {
          profile: {
            _id: "user-id",
            createdAt: "2022-01-01",
            email: "test@example.com",
            token: "test-token",
            updatedAt: "2022-01-01",
            username: "testuser",
          },
        },
      };

    const store = mockStore(initialState);

    const mockChildProps = {
      _id: "category-id",
      title: "Category Title",
      color: "#ffffff",
    };

    render(
      <Provider store={store}>
        <CategoryForm toggleActive={jest.fn()} childProps={mockChildProps} />
      </Provider>
    );

    expect(screen.getByDisplayValue("Category Title")).toBeInTheDocument();
    expect(screen.getByTestId("color-input").value).toBe("#ffffff");
    expect(screen.getByText("cancel")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();


});

  test("should close the modal after clicking on the close button", () => {
    const initialState = {
      auth: {
        profile: {
          _id: "user-id",
          createdAt: "2022-01-01",
          email: "test@example.com",
          token: "test-token",
          updatedAt: "2022-01-01",
          username: "testuser",
        },
      },
    };
  
    const store = mockStore(initialState);
  
    const mockChildProps = {
      _id: "category-id",
      title: "Category Title",
      color: "#ffffff",
    };
  
    const toggleActiveMock = jest.fn();
  
    render(
      <Provider store={store}>
        <CategoryForm toggleActive={toggleActiveMock} childProps={mockChildProps} />
      </Provider>
    );
  
    fireEvent.click(screen.getByText("cancel"));
  
    expect(toggleActiveMock).toHaveBeenCalledWith(false);
  });
  
  test("should disable the submit button if the length of the title is less than 3", () => {
    const initialState = {
      auth: {
        profile: {
          _id: "user-id",
          createdAt: "2022-01-01",
          email: "test@example.com",
          token: "test-token",
          updatedAt: "2022-01-01",
          username: "testuser",
        },
      },
    };
  
    const store = mockStore(initialState);
  
    const mockChildProps = {
      _id: "category-id",
      title: "Category Title",
      color: "#ffffff",
    };
  
    render(
      <Provider store={store}>
        <CategoryForm childProps={mockChildProps} />
      </Provider>
    );
  
    const submitButton = screen.getByText("submit");
  
    expect(submitButton).not.toBeDisabled();
  
    const titleInput = screen.getByDisplayValue("Category Title");
    fireEvent.change(titleInput, { target: { value: "A" } });
  
    expect(submitButton).toBeDisabled();
  });

});
