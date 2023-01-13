import AppButton from "@/components/AppButton";

const ButtonGroup = ({ onSubmit }: any) => {
  return (
    <div className="skill-test-btn-group">
      {/* <AppButton buttonTitle="Previous" id="previous-btn" /> */}
      {/* when end of tests, the below button's title is Submit */}
      {/* <AppButton buttonTitle="Next" id="next-btn" /> */}
      <AppButton buttonTitle="Submit" id="submit-btn" onClick={onSubmit} />
    </div>
  );
};

export default ButtonGroup;
