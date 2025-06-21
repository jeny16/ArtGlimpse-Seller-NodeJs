import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Container,
    Paper,
    Stack,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Palette,
    CurrencyRupee,
    LocalShipping,
    HeadphonesOutlined,
    ArrowForward,
    Star,
    PanTool,
    AutoAwesome,
    BarChart,
    ShoppingBag
} from '@mui/icons-material';

const HomePage = () => {
    const theme = useTheme();
    const highlight = theme.palette.custom.highlight;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const styles = {
        hero: {
            background: 'linear-gradient(135deg, #fdf6e9 0%, #fdf9f1 100%)',
            padding: theme.spacing(isMobile ? 4 : 8),
            position: 'relative',
            overflow: 'hidden',
            borderRadius: theme.spacing(2),
            mt: theme.spacing(10)
        },
        heroContent: {
            position: 'relative',
            zIndex: 2,
        },
        section: {
            padding: theme.spacing(isMobile ? 6 : 12, 0),
        },
        whiteSection: {
            backgroundColor: '#ffffff',
            padding: theme.spacing(isMobile ? 6 : 12, 0),
        },
        greySection: {
            backgroundColor: '#fdf6e9',
            padding: theme.spacing(isMobile ? 6 : 12, 0),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.06)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
            '&:hover': {
                transform: isMobile ? 'none' : 'translateY(-8px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
            }
        },
        statsCard: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
        },
        stepCard: {
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
            height: '100%',
            border: '1px solid #e0e0e0'
        },
        button: {
            backgroundColor: highlight,
            color: 'white',
            padding: theme.spacing(1.5, 6),
            borderRadius: theme.spacing(6),
            fontWeight: 600,
            boxShadow: `0 4px 8px ${highlight}33`,
            transition: 'all 0.3s ease-in-out',
            fontFamily: "'Raleway', sans-serif",
            '&:hover': {
                backgroundColor: theme.palette.custom.accent,
                boxShadow: `0 6px 10px ${highlight}55`,
                transform: 'scale(1.05)'
            }
        },
        secondaryButton: {
            borderColor: highlight,
            color: highlight,
            padding: theme.spacing(1.5, 6),
            borderRadius: theme.spacing(6),
            fontWeight: 600,
            transition: 'all 0.3s ease-in-out',
            fontFamily: "'Raleway', sans-serif",
            '&:hover': {
                borderColor: theme.palette.custom.accent,
                backgroundColor: `${highlight}10`,
                transform: 'scale(1.05)'
            }
        },
        highlightChip: {
            backgroundColor: highlight,
            color: '#ffffff',
            fontWeight: 600,
            marginBottom: theme.spacing(2)
        },
        stat: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    };

    return (
        <Box sx={{ backgroundColor: '#fdf6e9', mt: 16 }}>
            {/* Hero Section */}
            <Paper sx={styles.hero} elevation={0}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6} sx={styles.heroContent}>
                            <Chip label="ArtGlimpse for Sellers" sx={styles.highlightChip} />
                            <Typography
                                variant="h1"
                                gutterBottom
                                fontWeight="700"
                                fontSize={{ xs: "2rem", sm: "2.4rem", md: "2.8rem" }}
                                fontFamily="'Raleway', serif"
                            >
                                Turn Your Art Into a Thriving Business
                            </Typography>
                            <Typography
                                variant="h5"
                                paragraph
                                sx={{
                                    mb: 4,
                                    fontWeight: 400,
                                    opacity: 0.9,
                                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                                    fontFamily: "'Raleway', sans-serif"
                                }}
                            >
                                Join thousands of artisans showcasing their resin creations across India on our premium handcrafted marketplace.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={styles.button}
                                    endIcon={<ArrowForward />}
                                >
                                    Register as a Seller
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={styles.secondaryButton}
                                >
                                    Seller Login
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src="https://media.istockphoto.com/id/1346661870/photo/baskets-traditional-handicraft-products.jpg?s=612x612&w=0&k=20&c=CNV8ONrT8EoZFMPpdkHNOPqk2vTbLitB9n9FfmsLA88="
                                // src="/api/placeholder/550/400"
                                alt="Artisan crafting resin art"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: theme.spacing(3),
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                    transform: { xs: 'none', md: 'rotate(2deg)' }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>

            {/* Quick Stats */}
            <Container maxWidth="lg" sx={{ my: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography
                                    variant="h3"
                                    color={highlight}
                                    fontWeight="700"
                                    fontFamily="'Raleway', serif"
                                >
                                    5000+
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="'Raleway', sans-serif"
                                >
                                    Active Artisans
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography
                                    variant="h3"
                                    color={highlight}
                                    fontWeight="700"
                                    fontFamily="'Raleway', serif"
                                >
                                    ₹2.5M
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="'Raleway', sans-serif"
                                >
                                    Monthly Revenue
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={styles.statsCard} elevation={0}>
                            <Box sx={styles.stat}>
                                <Typography
                                    variant="h3"
                                    color={highlight}
                                    fontWeight="700"
                                    fontFamily="'Raleway', serif"
                                >
                                    500K+
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="'Raleway', sans-serif"
                                >
                                    Monthly Visitors
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Why Sell with ArtGlimpse */}
            <Box sx={styles.whiteSection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Benefits" sx={styles.highlightChip} />
                        <Typography
                            variant="h2"
                            fontWeight="700"
                            gutterBottom
                            fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
                            fontFamily="'Raleway', serif"
                            color="#814d0b"
                        >
                            Why Artisans Choose ArtGlimpse
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                fontFamily: "'Raleway', sans-serif"
                            }}
                        >
                            We provide everything you need to showcase your handcrafted resin art and grow your business.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[100], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <BarChart sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                        Low Commission
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontFamily="'Raleway', sans-serif">
                                        Just 10% platform fee with zero commission for your first month after joining.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[100], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <CurrencyRupee sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                        Weekly Payments
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontFamily="'Raleway', sans-serif">
                                        Get paid every 7 days directly to your bank account with no minimum threshold.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[100], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <LocalShipping sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                        Shipping Support
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontFamily="'Raleway', sans-serif">
                                        Free pickup from your doorstep with discounted shipping rates nationwide.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={3}>
                            <Card sx={styles.card} elevation={0}>
                                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                    <Box sx={{ backgroundColor: theme.palette.grey[100], borderRadius: '50%', p: 2, mb: 2, display: "inline-flex" }}>
                                        <HeadphonesOutlined sx={{ color: highlight, fontSize: '2rem' }} />
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                        Dedicated Support
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontFamily="'Raleway', sans-serif">
                                        Personal account manager and 24/7 seller support in multiple languages.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How to Get Started */}
            <Box sx={styles.greySection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Getting Started" sx={styles.highlightChip} />
                        <Typography
                            variant="h2"
                            fontWeight="700"
                            gutterBottom
                            fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
                            fontFamily="'Raleway', serif"
                            color="#814d0b"
                        >
                            Start Selling in 4 Simple Steps
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                fontFamily: "'Raleway', sans-serif"
                            }}
                        >
                            Begin your selling journey and reach customers across India with our easy setup process.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { step: '1', title: 'Create Your Account', desc: 'Register with basic details and verify your identity and business documents.' },
                            { step: '2', title: 'Set Up Your Shop', desc: 'Customize your storefront with your brand story, logo, and showcase your craftsmanship.' },
                            { step: '3', title: 'List Your Products', desc: 'Upload high-quality images and detailed descriptions of your resin creations.' },
                            { step: '4', title: 'Start Selling', desc: 'Receive orders, ship products, and grow your handcrafted business nationwide.' }
                        ].map(({ step, title, desc }) => (
                            <Grid key={step} item xs={12} md={6} lg={3}>
                                <Card sx={styles.stepCard} elevation={0}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Avatar
                                            sx={{
                                                bgcolor: highlight,
                                                color: 'white',
                                                width: 40,
                                                height: 40,
                                                fontWeight: 'bold',
                                                fontFamily: "'Raleway', sans-serif"
                                            }}
                                        >
                                            {step}
                                        </Avatar>
                                        <Typography variant="body2" color="text.secondary" ml={2} fontFamily="'Raleway', sans-serif">
                                            Step {step}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={2} fontFamily="'Raleway', sans-serif">
                                        {desc}
                                    </Typography>
                                    <Box sx={{ height: '6px', width: '40%', backgroundColor: highlight, borderRadius: '3px', mt: 'auto' }} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={8} textAlign="center">
                        <Button variant="contained" size="large" sx={styles.button} endIcon={<ArrowForward />}>
                            Join ArtGlimpse Today
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Success Stories */}
            <Box sx={styles.whiteSection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Success Stories" sx={styles.highlightChip} />
                        <Typography
                            variant="h2"
                            fontWeight="700"
                            gutterBottom
                            fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
                            fontFamily="'Raleway', serif"
                            color="#814d0b"
                        >
                            Artisans Thriving with ArtGlimpse
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                fontFamily: "'Raleway', sans-serif"
                            }}
                        >
                            Real stories from artisans who transformed their passion into successful businesses.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                title: "Priya's Resin Workshop",
                                desc: 'ArtGlimpse helped me showcase my designs to customers across India. Now I have a team of 5 artisans!',
                                stat: '300% growth in 8 months',
                                rating: 5
                            },
                            {
                                title: "Raman's Art Gallery",
                                desc: 'From selling locally to shipping nationwide, ArtGlimpse transformed my small workshop into a brand.',
                                stat: '₹3.2 lakh monthly revenue',
                                rating: 5
                            },
                            {
                                title: "Meera's Crafts",
                                desc: 'The support and tools provided helped me scale my business while focusing on my artistic vision.',
                                stat: 'Orders from 95+ cities',
                                rating: 5
                            }
                        ].map((story, idx) => (
                            <Grid key={idx} item xs={12} md={4}>
                                <Card sx={styles.card} elevation={0}>
                                    <Box sx={{
                                        height: 180,
                                        backgroundColor: '#fdf6e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Box
                                            component="img"
                                            src="https://img.freepik.com/premium-photo/man-stands-with-crossed-hands-handicraft-items-casual-woman-s-using-tablet-craft-gallery_8595-20172.jpg"
                                            // src="/api/placeholder/400/180"
                                            alt="Artist success story"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                            <Typography variant="h5" fontWeight="600" fontFamily="'Raleway', serif">
                                                {story.title}
                                            </Typography>
                                            <Box display="flex">
                                                {[...Array(story.rating)].map((_, i) => (
                                                    <Star key={i} sx={{ color: highlight, fontSize: '1rem' }} />
                                                ))}
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" paragraph fontFamily="'Raleway', sans-serif">
                                            "{story.desc}"
                                        </Typography>
                                        <Typography variant="body2" fontWeight="600" color={highlight} fontFamily="'Raleway', sans-serif">
                                            {story.stat}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Seller Tools & Features */}
            <Box sx={styles.greySection}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Chip label="Seller Tools" sx={styles.highlightChip} />
                        <Typography
                            variant="h2"
                            fontWeight="700"
                            gutterBottom
                            fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
                            fontFamily="'Raleway', serif"
                            color="#814d0b"
                        >
                            Tools to Grow Your Crafting Business
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{
                                maxWidth: '700px',
                                mx: 'auto',
                                fontFamily: "'Raleway', sans-serif"
                            }}
                        >
                            Everything you need to manage and scale your handcrafted business.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                icon: <ShoppingBag sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Sales Dashboard",
                                desc: 'Track orders, monitor sales performance and analyze customer behavior with intuitive analytics.'
                            },
                            {
                                icon: <Palette sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Shop Customization",
                                desc: 'Create a branded storefront that showcases your unique craftsmanship and style.'
                            },
                            {
                                icon: <AutoAwesome sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Promotion Tools",
                                desc: 'Run special offers, create discount coupons and boost visibility for your products.'
                            },
                            {
                                icon: <LocalShipping sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Logistics Support",
                                desc: 'Manage shipping with doorstep pickup and real-time tracking for all your orders.'
                            },
                            {
                                icon: <PanTool sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Artisan Community",
                                desc: 'Connect with fellow craftspeople for support, inspiration and collaboration.'
                            },
                            {
                                icon: <BarChart sx={{ color: highlight, fontSize: '2rem' }} />,
                                title: "Growth Insights",
                                desc: 'Get personalized recommendations to improve your store performance and visibility.'
                            }
                        ].map((feature, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={4}>
                                <Card sx={styles.card} elevation={0}>
                                    <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                        <Box sx={{
                                            backgroundColor: theme.palette.grey[100],
                                            borderRadius: '50%',
                                            p: 2,
                                            mb: 2,
                                            display: "inline-flex"
                                        }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h5" gutterBottom fontWeight="600" fontFamily="'Raleway', serif">
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontFamily="'Raleway', sans-serif">
                                            {feature.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #fdf6e9 0%, #fdf9f1 100%)',
                padding: theme.spacing(10, 0),
                color: theme.palette.text.primary,
            }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            fontWeight="700"
                            gutterBottom
                            fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
                            fontFamily="'Raleway', serif"
                            color="#814d0b"
                        >
                            Ready to Share Your Craft with India?
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            paragraph
                            sx={{
                                opacity: 0.9,
                                mb: 6,
                                fontFamily: "'Raleway', sans-serif"
                            }}
                        >
                            Join thousands of artisans turning their passion for resin art into a thriving business.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                            <Button variant="contained" size="large" sx={styles.button} endIcon={<ArrowForward />}>
                                Begin Your Seller Journey
                            </Button>
                            <Button variant="outlined" size="large" sx={styles.secondaryButton}>
                                Schedule a Demo
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
