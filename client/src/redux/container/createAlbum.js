// containers/CreateAlbumContainer.js
import { connect } from 'react-redux';
import { createAlbum } from '../action/album';
import CreateAlbum from '../../components/Albums/CreateAlbum' // Import the presentational component

const mapStateToProps = (state) => {
  // Map Redux state to component props if needed
  return {
    // Example: albums: state.albums,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAlbum: (albumData) => {
      dispatch(createAlbum(albumData));
    },
  };
};

// Connect the container component to the Redux store and pass it to the presentational component
export default connect(mapStateToProps, mapDispatchToProps)(CreateAlbum);
