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

const cardFormat = `
  box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,.1),
    0 0.9375rem 1.40625rem rgba(90,97,105,.1),
    0 0.25rem 0.53125rem rgba(90,97,105,.12),
    0 0.125rem 0.1875rem rgba(90,97,105,.1);

  padding: 10px;
  margin-bottom: 20px;
  `;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledContainer = styled.div`
  position: relative;
  height: 40vh;
  width: 82.5vw;
  ${cardFormat}
`;
const StyledContainerSmall = styled.div`
  position: relative;
  height: 40vh;
  width: 40vw;
  margin-left: 10px;
  margin-right: 10px;
  ${cardFormat}

  @media screen and (max-width: 950px) {
    width: 80vw;
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
  }
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
  getEvents: () => dispatch(getEvents()),
  getMoods: () => dispatch(getMoods())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General);