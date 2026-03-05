import { useEffect, type PropsWithChildren } from "react";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";

export function Layout(props: PropsWithChildren) {
    const navigate = useNavigate();

    useEffect(() => {
        // Tiap kali aplikasi pertama kali load (refresh), pindah ke /
        navigate('/');
    }, []);

    return <Stack>
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
                <Box display='flex' justifyContent="center" flexGrow={1}>
                    {/* <Box display='flex' gap={2}>
                        <Typography variant="h6" sx={{ mr: 2, fontWeight: 'bold' }}>
                            Intro-React
                        </Typography>

                        <Button color="inherit" component={Link} to="/">
                            HomePage
                        </Button>
                        <Button color="inherit" component={Link} to="/post">
                            PostList
                        </Button>
                    </Box> */}
                    <Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
            <Box sx={{ py: 3 }}>
                {props.children}
            </Box>
        </Container>
    </Stack>
}
