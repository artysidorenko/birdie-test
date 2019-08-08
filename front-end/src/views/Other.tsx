import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getMedication, getPadCondition, getTasks } from '../store/actions';

import MixedBar from '@App/components/graphs/MixedBar';
import TaskGraph from '@App/components/graphs/TaskGraph';

interface ActionProps {
  getMedication: () => void;
  getPadCondition: () => void;
  getTasks: () => void;
}

type AppProps = DataState & ActionProps;

const StyledContainer = styled.div`
  position: relative;
  height: 70vh;
  width: 40vw;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
`;

class Other extends React.Component<AppProps> {
  displayName: 'LineExample';

  componentDidMount() {
    this.props.getMedication();
    this.props.getPadCondition();
    this.props.getTasks();
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
  getMedication: () => dispatch(getMedication()),
  getPadCondition: () => dispatch(getPadCondition()),
  getTasks: () => dispatch(getTasks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Other);
