import React, {Component} from 'react';
import { Editor} from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";



export default class UyumNotation extends Component {
    constructor(props) {
        super(props);
        this.state = {
             uyumContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleKeyCommand = this.handleKeyCommand.bind(this);

    }
    handleKeyCommand(command) {

        if (command === 'split-block') {

         }
        return 'not-handled';
    }

    componentDidMount() {

    }

    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

        this.setState({uyumContent:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };


    render() {

        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        );
    }
}

