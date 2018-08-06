import { toast } from 'react-toastify';

const toastDefaultProps = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true,
};

export const openNotification = (props) => {
  toast[props.type](props.message, Object.assign(toastDefaultProps, {}, props.toastStyles));
};

export const destroyAllNotifications = () => {
  toast.dismiss();
};
