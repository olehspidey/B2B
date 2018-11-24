import * as React from 'react';
import { ITimerDownComponentProps } from './Props/ITimerDownComponentProps';
import { ITimerDownComponentState } from './States/ITimerDownComponentState';

const getTimeToEndMilisec = (endTime: Date) => endTime.valueOf() - new Date().valueOf();

const getDaysToEnd = (endTime: Date) => Math.floor(getTimeToEndMilisec(endTime) / 3600000 / 24);
const getMinutesToEnd = (endTime: Date) => new Date(getTimeToEndMilisec(endTime)).getUTCMinutes();
const getSecondsToEnd = (endTime: Date) => new Date(getTimeToEndMilisec(endTime)).getUTCSeconds();

class TimerDownComponent extends React.Component<ITimerDownComponentProps, ITimerDownComponentState> {
    constructor(props: ITimerDownComponentProps) {
        super(props);

        this.state = {
            days: 0,
            minutes: 0,
            seconds: 0
        }
    }

    public componentDidMount() {
        const tick = 1000;
        const { endTime } = this.props;
        const callBackTick = () => {
            this.setState({
                days: getDaysToEnd(endTime),
                minutes: getMinutesToEnd(endTime),
                seconds: getSecondsToEnd(endTime)
            })
        };

        setInterval(callBackTick, tick);
    }

    public render() {
        const { days, minutes, seconds } = this.state;

        return (
            <div className={this.props.className}>
                {
                    `Days: ${days} Minutes: ${minutes} Seconds: ${seconds}`
                }
            </div>
        );
    }
}

export default TimerDownComponent;