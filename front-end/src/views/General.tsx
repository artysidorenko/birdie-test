import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getEvents, getMoods } from '../store/actions';

import VisitsBar from '@App/components/graphs/VisitsBar';
import CarerPie from '@App/components/graphs/CarerPie';
import MoodsBar from '@App/components/graphs/MoodsBar';

interface ActionProps {
  getEvents: () => void;
  getMoods: () => void;
}

type AppProps = DataState & ActionProps;

const StyledContainer = styled.div`
  position: relative;
  height: 40vh;
  width: 80vw;
`;
const StyledContainerSmall = styled.div`
  position: relative;
  height: 40vh;
  width: 40vw;
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
`;

class General extends React.Component<AppProps> {
  displayName: '';

  componentDidMount() {
    this.props.getEvents();
    this.props.getMoods();
  }

  render() {
    const { status: eventStatus, events } = this.props.events;
    const { status: moodStatus, moods } = this.props.moods;

    return (
      <div>
        {eventStatus === fetchStatus.SUCCESS &&
        moodStatus === fetchStatus.SUCCESS ? (
          <React.Fragment>
            <StyledContainer id="mood">
              <MoodsBar data={moods} />
            </StyledContainer>
            <Row>
              <StyledContainerSmall id="visits">
                <VisitsBar data={events} />
              </StyledContainerSmall>
              <StyledContainerSmall id="carers">
                <CarerPie data={events} />
              </StyledContainerSmall>
            </Row>
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  getEvents: () => dispatch(getEvents()),
  getMoods: () => dispatch(getMoods())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);
