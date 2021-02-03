import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
   
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => {
      return getByText(day, "Monday")
    });

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument;
  });

  it('shows the save error when failing to save an appointment', async () => {
    // 1. Set the axios object to an error state one time 
    axios.put.mockRejectedValueOnce()
    const { container } = render(<Application />)

    // 2. Get a container element and try to add to it
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, 'Add'))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    // 3. Try to save the edit
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))

    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Error'))

    // 4. Expect an error when saving
    expect(getByText(appointment, "Error")).toBeInTheDocument()
    const day = getAllByTestId(container, 'day').find(day => {
      return getByText(day, 'Monday')
    })

    // 5. Expect the days remaining not to change.
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    // 1. Set up axios to run in error mode.
    axios.delete.mockRejectedValueOnce()

    // 2. Render, and get an appointment element
    const { container }     = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointments      = getAllByTestId(container, 'appointment')
    const appointment       = appointments[1]

    // 3. Try to delete, and expect an error.
    fireEvent.click(getByAltText(appointment, 'Delete'))

    fireEvent.click(getByText(appointment, 'Confirm'))
    
    await waitForElement(() => getByText(appointment, 'Error'))
    
    expect(getByText(appointment, 'Error')).toBeInTheDocument()

    // 4. Expect the days remaining not to have changed.
    const day = getAllByTestId(container, 'day')
    .find(day => getByText(day, 'Monday'));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});