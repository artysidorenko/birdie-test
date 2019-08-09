import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getEvents, getMoods } from '../store/actions';
import { cardFormat } from '../utils/sharedStyle';

import VisitsBar from '@App/components/graphs/VisitsBar';
import CarerPie from '@App/components/graphs/CarerPie';
import MoodsBar from '@App/components/graphs/MoodsBar';

interface ActionProps {
  getEvents: (id: string) => void;
  getMoods: (id: string) => void;
}

type AppProps = DataState & ActionProps;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;

  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Row = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (min-width: 951px) {
    height: 40vh;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledContainer = styled.div`
  position: relative;
  height: 40vh;
  width: 100%;
  ${cardFormat}
`;
const StyledContainerSmall = styled.div`
  position: relative;
  width: 48%;
  height: 40vh;
  ${cardFormat}

  @media screen and (max-width: 950px) {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }

  &#carers {
    box-sizing: border-box;
    padding-bottom: 20px;
  }
`;

class General extends React.Component<AppProps> {
  displayName: '';

  componentDidMount() {
    this.props.getEvents(this.props.id);
    this.props.getMoods(this.props.id);
  }

  render() {
    const { status: eventStatus, events } = this.props.events;
    const { status: moodStatus, moods } = this.props.moods;

    return (
      <StyledWrapper>
        {eventStatus === fetchStatus.SUCCESS &&
        moodStatus === fetchStatus.SUCCESS ? (
          <React.Fragment>
            <Row>
              <StyledContainerSmall id="mood">
                <MoodsBar data={moods} />
              </StyledContainerSmall>
              <StyledContainerSmall id="carers">
                <CarerPie data={events} />
              </StyledContainerSmall>
            </Row>
            <StyledContainer id="visits">
              <VisitsBar data={events} />
            </StyledContainer>
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </StyledWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  getEvents: (id: string) => dispatch(getEvents(id)),
  getMoods: (id: string) => dispatch(getMoods(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);