import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/test-path" }),
}));

describe("Modal", () => {
  it("renders without crashing", () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        Hey
      </Modal>
    );
  });
});
