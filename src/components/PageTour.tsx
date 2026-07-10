import Joyride, { type CallBackProps, STATUS, type Step } from 'react-joyride'

export default function PageTour({ run, setRun, steps, storageKey }: { run: boolean; setRun: (v: boolean) => void; steps: Step[]; storageKey: string }) {
  const callback = (data: CallBackProps) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status as typeof STATUS.FINISHED)) {
      localStorage.setItem(`vglp-tour-${storageKey}`, 'seen')
      setRun(false)
    }
  }
  return <Joyride run={run} steps={steps} callback={callback} continuous showProgress showSkipButton disableOverlayClose scrollToFirstStep locale={{ back: 'Geri', close: 'Bağla', last: 'Bitir', next: 'İrəli', skip: 'Ötür' }} styles={{ options: { primaryColor: '#0A4D8C', zIndex: 10000, arrowColor: '#0A4D8C', backgroundColor: '#ffffff', textColor: '#1e293b' }, buttonNext: { borderRadius: 8, padding: '10px 20px' }, tooltipContainer: { borderRadius: 16, textAlign: 'left' }, tooltip: { borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.2)' } }} />
}
