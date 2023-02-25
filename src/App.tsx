import {useEffect, useRef, useState} from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";

const App = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [showBtn, setShowBtn] = useState<boolean>(true)

    const isBottom = (el: HTMLElement) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('container');
        if (isBottom(wrappedElement)) {
            setShowBtn(false)
        } else {
            setShowBtn(true)
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling)
        return () =>
            document.removeEventListener('scroll', trackScrolling);
    }, [trackScrolling]);

    return (
        <Box
            sx={{
                position: 'relative',
                mx: 25,
                mt: 2,
                mb: 15,
                textAlign: 'justify'
            }}
            ref={containerRef}
            id={'container'}>
            {
                [...new Array(25)]
                    .map(() => `Lorem ipsum dolor sit amet,
                               consectetur adipisicing elit.
                               Aliquid consequuntur dolorem eos expedita 
                               impedit ipsum maiores nulla,
                               odio officiis optio quas quod reiciendis,
                               saepe sunt tenetur unde voluptas
                               voluptate voluptatibus?`,
                    )
                    .join('\n')
            }
            <Paper elevation={3} sx={{p: 2, mt: 15}} ref={ref}>
                <Stack direction={'column'} alignItems={'center'}>
                    <Typography>I want to see here, need the float button disappear!</Typography>
                    <Button
                        variant={'contained'}
                        size={'small'}
                        onClick={() => {
                            alert('Do something')
                        }}
                    >Scroll to down</Button>
                </Stack>
            </Paper>
            <Stack alignItems={'center'} sx={{
                position: 'sticky',
                bottom: 10,
                display: showBtn ? 'normal' : 'none'
            }}>
                <Button
                    variant={'contained'}
                    size={'small'}
                    onClick={() => {
                        ref.current?.scrollIntoView({behavior: 'smooth'})
                    }}
                >Scroll to down</Button>
            </Stack>
        </Box>
    );
}
export default App
