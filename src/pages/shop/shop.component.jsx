import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/collection.component';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container';
// import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    this.props.fetchCollectionStartAsync();
  }

  render() {
    // const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          // render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />} 
          component={CollectionsOverviewContainer}
        />
        <Route path={`${match.path}/:collectionId`}  
          // render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} 
          component={CollectionPageContainer}
        />
      </div>
    )
  }
}

// const mapStateToProps = createStructuredSelector({
//   isCollectionsFetching: selectIsCollectionsFetching,
//   isCollectionsLoaded: selectIsCollectionsLoaded
// });
const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});
// export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
export default connect(null, mapDispatchToProps)(ShopPage);