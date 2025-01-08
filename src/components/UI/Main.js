import React, { useEffect } from 'react';
import Accordion from '../Container/Accordion';
import classes from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../../features/launches/launchesSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from './LoadingSpinner';

const Main = () => {
  const dispatch = useDispatch();
  const { launches, searchQuery, hasMore, offset, loading } = useSelector(
    (state) => state.launches
  );

  console.log({ launches });

  const fetchMoreLaunches = () => {
    // console.log(!hasMore || launches.length % 10 !== 0);
    // if (!hasMore || launches.length % 10 !== 0) return; // Prevent unnecessary calls
    // dispatch(fetchLaunches({ searchQuery, offset }));

    if (!hasMore || loading) return; // Prevent unnecessary calls
    dispatch(fetchLaunches({ searchQuery, offset }));
  };

  useEffect(() => {
    // Fetch the first 10 launches when the page loads
    dispatch(fetchLaunches({ searchQuery, offset: 0 }));
  }, [dispatch, searchQuery]);

  return (
    <div className={classes.listContainer}>
      <div className={classes.listWrapper} id="scrollableDev">
        <InfiniteScroll
          // dataLength={launches.length}
          // hasMore={hasMore}
          // next={fetchMoreLaunches}
          // loader={hasMore && loading && <LoadingSpinner />}
          // scrollThreshold={1}
          // height={400}
          // endMessage={
          //   !hasMore && (
          //     <p style={{ marginTop: '10px', textAlign: 'center' }}>
          //       No more launches to load.
          //     </p>
          //   )
          // }
          dataLength={launches.length} // This should always match the current number of items rendered
          hasMore={hasMore} // InfiniteScroll will stop if this is false
          next={fetchMoreLaunches} // Function to fetch more data
          loader={loading && <LoadingSpinner />} // Show loader only if loading is true
          scrollThreshold={0.9} // Trigger fetch when 80% down the scrollable container
          height={400} // Set the container height
          endMessage={
            launches.length === 0 ? (
              <p style={{ marginTop: '10px', textAlign: 'center' }}>
                No result Please try again.
              </p>
            ) : (
              launches.length > 1 &&
              !hasMore && (
                <p style={{ marginTop: '10px', textAlign: 'center' }}>
                  No more launches to load.
                </p>
              )
            )
          }
        >
          <ul>
            {launches.map((item) => {
              return (
                <Accordion
                  key={item.flight_number}
                  mission_name={item.mission_name}
                  launch_success={item.launch_success}
                  upcoming={item.upcoming}
                  details={item.details}
                />
              );
            })}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Main;
