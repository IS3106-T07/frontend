/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import BookmarkList from "./BookmarkList";
import { SET_CURRENT_PAGE } from "../App";

class BookmarkPage extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    this.setState({}, () =>
      dispatch({
        type: SET_CURRENT_PAGE,
        page: 1
      })
    );
  }

  render() {
    return (
      <div>
        <Typography
          variant="h3"
          style={{
            color: "gray",
            marginTop: 20,
            marginLeft: "4vw"
          }}
        >
          Bookmark
        </Typography>
        <BookmarkList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmark: state.userProfile.bookmark
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkPage);
