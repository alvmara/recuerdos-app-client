    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    export const styleDropzone = ({isFocused, isDragAccept, isDragReject})=> ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    });

    export const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: 'max(80vh, 300px)',
        maxWidth: 'max(80vw, 300px)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };