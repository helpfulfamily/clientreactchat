import React, { Component }  from 'react'
import './channeltagstyle.css';
import { WithContext as ReactTags } from 'react-tag-input';


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


export default class ChannelTagComponent extends  Component {
  constructor(props) {
    super(props);

    var suggestions=[];
    if(typeof this.props.suggestions !=="undefined"){


      this.props.suggestions.forEach(function(channel) {

        suggestions.push( {id: channel.id+"", text: channel.name });

      });
    }
    this.state = {
      tags: [],
      suggestions: suggestions,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.onAnyChange = this.onAnyChange.bind(this);
  }
  onAnyChange(tags){
    this.props.onChange(tags);
  }
  handleDelete(i) {
    const { tags } = this.state;
    var currentTags=  tags.filter((tag, index) => index !== i);
    this.onAnyChange(currentTags);
    this.setState({
      tags:currentTags,
    });

  }

  handleAddition(tag) {

   this.setState(state => ({ tags: this.changeState(state, tag)}));

  }
  changeState(state, tag){
    var currentTags= [...state.tags, tag];

    this.onAnyChange(currentTags);

    return currentTags;
  }
  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
    this.onAnyChange(newTags);
  }

  handleTagClick(index) {
    console.log('The tag at index ' + index + ' was clicked');
  }

  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
        />
      </div>
    );
  }
}