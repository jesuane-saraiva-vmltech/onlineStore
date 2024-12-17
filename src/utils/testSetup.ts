export const setupDialogMocks = () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
};
