import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';

export const Navbar = () => {
    const { openSideMenu } = useContext(UIContext);

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={openSideMenu}
                >
                    <MenuOutlinedIcon />
                </IconButton>
                {/* Usar legacyBehavior para usar el antiguo LINK de next que se puede encerrar con <a></a> */}
                <NextLink href="/" passHref legacyBehavior> 
                    <Link underline='none' color="white">
                        <Typography variant='h6'>OpenTrello</Typography>
                    </Link>
                </NextLink>
            </Toolbar>

        </AppBar>
    )
}

