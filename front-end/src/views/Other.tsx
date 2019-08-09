import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getMedication, getPadCondition, getTasks } from '../store/actions';
import { cardFormat } from '../utils/sharedStyle';

import MixedBar from '@App/components/graphs/MixedBar';
import TaskGraph from '@App/components/graphs/TaskGraph';

interface ActionProps {
  getMedication: (id: string) => void;
  getPadCondition: (id: string) => void;
  getTasks: (id: string) => void;
}

type AppProps = DataState & ActionProps;

const StyledContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 40vw;
  padding: 10px;
  ${cardFormat}

  @media screen and (max-width: 950px) {
    position: relative;
    height: 50vh;
    width: 80vw;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

class Other extends React.Component<AppProps> {
  displayName: 'Other';

  componentDidMount() {
    this.props.getMedication(this.props.id);
    this.props.getPadCondition(this.props.id);
    this.props.getTasks(this.props.id);
  }

  render() {

    const { status: eventStatus, medication } = this.props.medication;
    const { status: padStatus, pad_condition } = this.props.pad_condition;
    const { status: taskStatus, tasks } = this.props.tasks;

    return (
      <Row>
        {eventStatus === fetchStatus.SUCCESS &&
        padStatus === fetchStatus.SUCCESS &&
        taskStatus === fetchStatus.SUCCESS ? (
          <React.Fragment>
            <StyledContainer id="mixed">
              <MixedBar medData={medication} padData={pad_condition} />
            </StyledContainer>
            <StyledContainer id="tasks">
              <TaskGraph data={tasks} />
            </StyledContainer>
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  getMedication: (id: string) => dispatch(getMedication(id)),
  getPadCondition: (id: string) => dispatch(getPadCondition(id)),
  getTasks: (id: string) => dispatch(getTasks(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Other);
