declare module 'react-modal' {
  import * as React from 'react';

  interface ModalProps {
    isOpen: boolean;
    onRequestClose?: () => void;
    contentLabel?: string;
    appElement?: HTMLElement | null;
    children?: React.ReactNode;
  }

  class Modal extends React.Component<ModalProps> {
    static setAppElement(appElement: HTMLElement | null): void;
    render(): React.ReactNode;
  }

  export default Modal;
}
