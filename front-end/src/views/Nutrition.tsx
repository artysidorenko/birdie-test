import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';

import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '../store';
import { DataState, status as fetchStatus } from '../store/types';
import { getFluidIntake, getFoodIntake } from '../store/actions';

import FluidGraph from '@App/components/graphs/FluidGraph';
import FoodGraph from '@App/components/graphs/FoodGraph';

interface ActionProps {
  getFluidIntake: () => void;
  getFoodIntake: () => void;
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

const StyledContainer = styled.div`
  position: relative;
  height: 50vh;
  margin-left: 20px;
  margin-right: 20px;
  ${cardFormat}
`;

class Nutrition extends React.Component<AppProps> {
  displayName: 'LineExample';

  componentDidMount() {
    this.props.getFluidIntake();
    this.props.getFoodIntake();
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
  getFluidIntake: () => dispatch(getFluidIntake()),
  getFoodIntake: () => dispatch(getFoodIntake())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nutrition);
