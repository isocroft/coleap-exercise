import React from "react";
import { composeClasses } from "../../libs/utils";
import styles from "./Modal.module.css";

export interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  id: string;
  headingText: string;
  ctaButtonText?: string;
  ctaButtonClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  id,
  headingText,
  ctaButtonClickHandler,
  className = "",
  ctaButtonText = "",
  children,
  ...props
}: ModalProps) => {
  const onCancelClick: React.MouseEventHandler<HTMLElement> = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const global: Window = window;
    const location: Location = global.location;

    event.preventDefault();
    location.hash = "#";
  };

  return (
    <div
      id={id}
      className={composeClasses(className, styles.modalWrapper)}
      {...props}
    >
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>{headingText}</h3>
        <section>{children}</section>
        <footer className={styles.modalFooter}>
          <button onClick={onCancelClick}>Cancel</button>
          {ctaButtonText === "" ? null : (
            <button onClick={ctaButtonClickHandler}>{ctaButtonText}</button>
          )}
        </footer>
        <a
          href={"javscript:void(0);"}
          onClick={onCancelClick}
          className={styles.modalClose}
        >
          &times;
        </a>
      </div>
    </div>
  );
};

export default Modal;
