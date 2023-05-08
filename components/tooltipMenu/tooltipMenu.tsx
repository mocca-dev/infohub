import { FunctionComponent } from 'react';
import { Option } from '@/types/types';
import styles from './tooltipMenu.module.css';
import useOutsideClick from '@/hooks/useOutsideClick';

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  menuOptions: Option[];
};

const TooltipMenu: FunctionComponent<Props> = ({
  isOpen,
  setIsOpen,
  menuOptions,
}) => {
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <dialog ref={ref} className={styles.modalContainer} open={isOpen}>
      {menuOptions.map((option) => (
        <button
          key={option.label}
          className={styles.optionBtn}
          onClick={option.action}
        >
          {option.label}
        </button>
      ))}
    </dialog>
  );
};

export default TooltipMenu;
