import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getFluidIntake, getFoodIntake } from '../store/actions';
import { cardFormat } from '../utils/sharedStyle';

import FluidGraph from '@App/components/graphs/FluidGraph';
import FoodGraph from '@App/components/graphs/FoodGraph';

interface ActionProps {
  getFluidIntake: (id: string) => void;
  getFoodIntake: (id: string) => void;
}

type AppProps = DataState & ActionProps;

const StyledContainer = styled.div`
  position: relative;
  height: 50vh;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  ${cardFormat}
`;

class Nutrition extends React.Component<AppProps> {
  displayName: 'LineExample';

  componentDidMount() {
    this.props.getFluidIntake(this.props.id);
    this.props.getFoodIntake(this.props.id);
  }

  render() {
    const { status: fluidStatus, fluid_intake } = this.props.fluid_intake;
    const { status: foodStatus, food_intake } = this.props.food_intake;

    return (
      <div>
        {fluidStatus === fetchStatus.SUCCESS ? (
          <StyledContainer id="fluid">
            <FluidGraph data={fluid_intake} />
          </StyledContainer>
        ) : (
          <span>Loading...</span>
        )}
        {foodStatus === fetchStatus.SUCCESS ? (
          <StyledContainer id="food">
            <FoodGraph data={food_intake} />
          </StyledContainer>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  getFluidIntake: (id: string) => dispatch(getFluidIntake(id)),
  getFoodIntake: (id: string) => dispatch(getFoodIntake(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nutrition);
