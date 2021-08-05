// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';


const ProgressBar = () => {

  const step2Validator = () => {
    return true;
  }

  const step3Validator = () => {
    return true;
  }

  const onFormSubmit = () => {
    alert('success')
  }

  return (
    <div>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: 'Personal Information',
            subtitle: '20%',
            name: 'step 1'
          },
          {
            label: 'Work Experience',
            subtitle: '20%',
            name: 'step 2',
            validator: step2Validator
          },
          {
            label: 'Education',
            subtitle: '20%',
            name: 'step 3',
            validator: step3Validator
          },
          {
            label: 'Skills',
            subtitle: '20%',
            name: 'step 3',
            validator: step3Validator
          },
          {
            label: 'Languages',
            subtitle: '20%',
            name: 'step 3',
            validator: step3Validator
          }
        ]}
      />
    </div>

  )
}

export default ProgressBar;