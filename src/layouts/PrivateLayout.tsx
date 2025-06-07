import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    )
}

export default PrivateLayout