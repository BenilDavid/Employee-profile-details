import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './Popup.scss';
import tick from '../../assets/images/accept.png'
import close from '../../assets/images/close.png'

export const Popup = ({
	className = 'modal-dialog-centered common-dialog',
	isOpen = false,
	message = '',
	message2 = '',
	image = 'tick',
	handleDialog,
	size = 'md',
}) => {
	return (
		<Modal
			isOpen={isOpen}
			handleDialog={handleDialog}
			className={className}
			size={size}
		>
			<ModalBody className="">
				<div className="modal-body px-3 py-4">
					<img src={image === 'tick' ? tick : close} alt="" />
					<p className="dialog__txt">
						<p className={` ${image === 'tick' ? 'success-msg' : 'failure-msg'}`}>{message}</p>
						<p className='success-description'>{message2}</p>
					</p>
				</div>
			</ModalBody>
		</Modal>
	);
}
