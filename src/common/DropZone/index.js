import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropZone.scss';

export const DropZone = ({
    onChange = () => {
        return null;
    },
    accept = null,
    value = '',
    maxFile = null,
}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        onChange(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, accept });

    const files = acceptedFiles.map((file) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        );
    });
    
    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className="dragndrop">
                    {/* <img className="mb-4" src="/upload.svg" alt="" /> */}
                    <p>
                        Drop your files here. or{' '}
                        <span className="red_browse">Browse</span>
                    </p>
                </div>
            </div>
            <aside>
                <ul className="mt-2" style={{ listStyle: 'none' }}>
                    {/* <div className="image-container">
                        <img
                            className="mx-1 preview-image"
                            src={value}
                        />
                    </div> */}
                    {value || files}
                </ul>
            </aside>
        </section>
    );
};
