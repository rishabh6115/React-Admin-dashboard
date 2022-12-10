import React from 'react'
import {Menu as MenuIcon,Search, SettingsOutlined,ArrowDropDownOutlined} from '@mui/icons-material/';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useDispatch } from 'react-redux';
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { setMode } from 'state';

const NavBar = ({ setIsSideBarOpen,isSideBarOpen}) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  console.log(isSideBarOpen)

  return (
    <AppBar sx={{position:'static',background:'none',boxShadow:'none',flex:'1'}} >
        <Toolbar sx={{justifyContent:'space-between'}} >
            {/* Left Side */}
            <FlexBetween>
                <IconButton onClick={()=>
                {
                     setIsSideBarOpen(!isSideBarOpen);
                     }}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius='9px' gap='3rem' p='0.1rem 1.5rem'>
                    <InputBase placeholder='Search...' />
                    <IconButton><Search/></IconButton>
                     </FlexBetween>
            </FlexBetween>
                {/* Right side */}
                <FlexBetween gap='1.5rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode==='dark' ? <DarkModeOutlinedIcon sx={{fontSize:'25px'}}/> : <LightModeOutlinedIcon  sx={{fontSize:'25px'}}/>}
                    </IconButton>
                    <IconButton><SettingsOutlined sx={{fontSize:'25px'}}/></IconButton>
                </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar