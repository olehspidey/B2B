import * as React from 'react';
import logo from '../../logo.png';
import ToolTip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';

interface ILogoProps {
    width: string,
    height: string,
    url: string
}

export default ({ width, height, url }: ILogoProps) => (
    <ToolTip title="Go home">
        <Link to={url}>
            <img style={{
                width,
                height,
                padding: '.5rem 0'
            }} src={logo} />
        </Link>
    </ToolTip>
);