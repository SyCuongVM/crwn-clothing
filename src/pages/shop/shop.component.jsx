import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    this.props.fetchCollectionStartAsync();
  }

  render() {
    const { match, isCollectionFeching } = this.props;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFeching} {...props} />} 
        />
        <Route path={`${match.path}/:collectionId`}  
          render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFeching} {...props} />} 
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFeching: selectIsCollectionFetching
});
const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);