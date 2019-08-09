import * as React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';

import { cardFormat } from '../utils/sharedStyle';
import { connect } from 'react-redux';
import { RootState } from '@App/store/reducers';
import { mapStateToProps } from '@App/store';
import { setID } from '../store/actions';
import { DataState } from '@App/store/types';

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

const Card = styled.div`
  ${cardFormat}
  width: 45%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 950px) {
    width: 95%
  }
`;

const StyledHeading = styled.h1`
  font-size: 16px;
  text-align: center;
`;

const StyledSubHeading = styled.h2`
  font-size: 14px;
`;

const StyledParagraph = styled.p`
  font-size: 13px;
`;

interface ActionProps {
  setID: (id: string) => void;
}
type AppProps = DataState & ActionProps;

class Dashboard extends React.Component<AppProps> {
  state = {
    formValue: this.props.id
  };
  handleChange = ({target}: {target: HTMLInputElement}) => {
    this.setState({
      formValue: target.value
    });
  }
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.setID(this.state.formValue);
  }

  render = () => (
    <StyledWrapper>
      <Card>
        <StyledHeading>Welcome to the Care Dashboard.</StyledHeading>
        <StyledHeading>Use the Box Below To Select Care Recipient ID Requested,
          and Follow the Navigaton Menu to Browse Available Information on Care Treatment.</StyledHeading>
        <StyledHeading><form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.formValue}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Change Recipient ID"
          />
        </form></StyledHeading>
      </Card>
      <Card>
        <StyledHeading>1. General Visit Information</StyledHeading>
        <ul>
          <li>
            <StyledSubHeading>Weekly Mood Score</StyledSubHeading>
            <StyledParagraph>Aggregated Score, based on qualitative mood observation scaled from happy (100),
              through okay (50) to sad (0). Where available, additional notes can be viewed
              by hovering over the individual bars.</StyledParagraph>
          </li>
          <li>
            <StyledSubHeading>Same Carer Visits Snapshot</StyledSubHeading>
            <StyledParagraph>Total number of visits by each individual caregiver, with the aim of maintaining
              consistency of interactions with care receivers, and developing lasting bonds,
              by maximising same-carer visits.</StyledParagraph>
          </li>
          <li>
            <StyledSubHeading>Daily Visits Tracking</StyledSubHeading>
            <StyledParagraph>Daily timeline of visits, with detailed notes (physical health, mental health
              and general observations) by caregivers available by hovering over indivdual days.</StyledParagraph>
          </li>
        </ul>
      </Card>
      <Card>
        <StyledHeading>2. Nutritional Information</StyledHeading>
        <ul>
          <li>
            <StyledSubHeading>Fluid Intake Chart</StyledSubHeading>
            <StyledParagraph>Daily tracking of total fluid intake, with breakdown of regular and caffeinated fluids,
              to facilitate adequate hydration.</StyledParagraph>
          </li>
          <li>
            <StyledSubHeading>Food Intake Chart</StyledSubHeading>
            <StyledParagraph>Number of meals and snacks eaten per day, with additional details
              on meal/snack composition available by hovering over indivdual datapoints.</StyledParagraph>
          </li>
        </ul>
      </Card>
      <Card>
        <StyledHeading>3. Other (Hygiene/Care Assistance)</StyledHeading>
        <ul>
          <li>
            <StyledSubHeading>Hygiene and Care Tracking</StyledSubHeading>
            <StyledParagraph>Weekly Tracking of any missed medication doses, as well as conditions of incontinence pad.
            Please note week 20 does not contain a full week's information due to timing of data capture.
            </StyledParagraph>
          </li>
          <li>
            <StyledSubHeading>Typical Assistance Tasks Chart</StyledSubHeading>
            <StyledParagraph>Snapshot of typical tasks that required assistance in the care period,
              helping to predict future care needs.</StyledParagraph>
          </li>
        </ul>
      </Card>
    </StyledWrapper>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  setID: (id: string) => dispatch(setID(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
