import { useRef } from 'react';
import Button from "../styledComponents/button";

export default function UploadButton({ uploadClick, accept }) {
    const fileInput = useRef(null);

    return (
        <div>
            <Button data-testid='upload-button' onClick={() => fileInput.current.click()}>Upload</Button>
            <input data-testid='upload-input'
                type="file"
                ref={fileInput}
                accept={accept}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        uploadClick(e.target.files[0]);
                    }
                }} 
                style={{ display: 'none' }} />
        </div>
    )
}