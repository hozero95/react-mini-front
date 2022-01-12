import React, {useEffect, useState} from "react";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from "react-froala-wysiwyg";

// export const froalaComps = () => {
//     ReactDOM.render(<FroalaEditor tag='textarea'/>, document.getElementById('editor'));
//     // return new FroalaEditor('#editor');
// };

const FroalaComps = (props) => {
    const [content, setContent] = useState('');
    const [readOnly, setReadOnly] = useState(true);

    useEffect(() => {
        setContent(props.content);
        setReadOnly(props.readOnly);
    }, [props.content]);

    const config = {};

    const onModelChange = (model) => {
        setContent(model);
        props.setContent(model);
    };

    return (
        <FroalaEditor
            tag='textarea'
            model={content}
            config={config}
            onModelChange={onModelChange}
        />
    );
};

export default FroalaComps;