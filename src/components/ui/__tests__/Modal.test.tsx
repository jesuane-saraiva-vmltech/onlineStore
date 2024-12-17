import { screen } from "@testing-library/react";
import Modal from "../Modal";

import { renderWithRouter } from "../../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import { setupDialogMocks } from "../../../utils/testSetup";

describe("Modal", () => {
  setupDialogMocks();

  it("should render children", () => {
    renderWithRouter(
      <Modal open={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should call showModal when open is true", () => {
    renderWithRouter(
      <Modal open={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("should call close when unmounting", () => {
    const { unmount } = renderWithRouter(
      <Modal open={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );

    unmount();
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it("should close modal when location changes", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    renderWithRouter(
      <>
        <Modal open={true} onClose={onClose}>
          <p>Modal Content</p>
        </Modal>
        <button onClick={() => window.history.pushState({}, "", "/new-route")}>
          Navigate
        </button>
      </>
    );

    // Verify modal is open
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    // Trigger navigation
    await user.click(screen.getByText("Navigate"));

    // Verify onClose was called
    expect(onClose).toHaveBeenCalled();
  });
});
