import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailed: false
        }
    }

    toggleDetailed = () => {
        this.setState({ detailed: !this.state.detailed })
    }

    render() {
        const hideWhenMaximized = { display: this.state.detailed ? 'none' : '' }
        const showWhenMaximized = { display: this.state.detailed ? '' : 'none' }
        return (
            <div className='blog'>
                <div style={hideWhenMaximized} className='blogMinimized'>
                    <p className='blogToggleMinimized' onClick={this.toggleDetailed}>{this.props.blog.title} {this.props.blog.author}</p>
                </div>
                <div style={showWhenMaximized} className='blogMaximized'>
                    <p className='blogToggleMaximized' onClick={this.toggleDetailed}>{this.props.blog.title} {this.props.blog.author}</p>
                    <ul className='blogDetails'>
                        <li><a href={this.props.blog.url}>{this.props.blog.url}</a></li>
                        <li>{this.props.blog.likes} likes<button onClick={(event) => this.props.handleLike(event, this.props.blog)}>like</button></li>
                        <li>added by {this.props.blog.user.name}</li>
                    </ul>
                    <button onClick={(event) => this.props.handleDelete(event, this.props.blog)}>delete</button>
                </div>
            </div>
        )
    }
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default Blog