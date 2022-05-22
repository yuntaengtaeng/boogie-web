import React from 'react';
import Modal from '../Ui/Modal/Modal';
import LoginForm from './LoginForm';
import ModalHeader from '../Ui/Modal/Header';

const LoginModal = ({ onCloseHandler, successCallback }) => {
  return (
    <Modal style={{ width: '60vw' }}>
      <ModalHeader title="Boogi on & on" onClose={onCloseHandler} />
      <LoginForm successCallback={successCallback} />
    </Modal>
  );
};

export default LoginModal;
