import React, { useState } from 'react';
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Button, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';

const Privacy = () => {
    const [expanded, setExpanded] = useState('introduction');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const privacySections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            content: `ArtGlimpse is committed to protecting your privacy as a seller. This Privacy Policy outlines how we collect, use, and safeguard your business data and personal information.`
        },
        {
            id: 'data-collection',
            title: '2. Data Collection',
            content: `We collect information provided by you, such as your business name, contact details, and address, along with data generated during your interactions with our platform.`
        },
        {
            id: 'data-usage',
            title: '3. How We Use Your Data',
            content: `Your information is used to manage your seller account, process transactions, provide customer support, and improve our services. We also analyze usage data to optimize your experience.`
        },
        {
            id: 'data-sharing',
            title: '4. Data Sharing and Third Parties',
            content: `We do not sell your personal data. However, we may share your information with trusted partners for service delivery and operational purposes, under strict confidentiality agreements.`
        },
        {
            id: 'cookies',
            title: '5. Cookies and Tracking',
            content: `Our platform uses cookies and similar technologies to enhance your experience, manage sessions, and offer personalized content. You can manage your cookie preferences through your browser.`
        },
        {
            id: 'your-rights',
            title: '6. Your Rights',
            content: `As a seller, you have the right to access, update, or delete your information. For any concerns regarding your data, please contact our support team.`
        },
        {
            id: 'security',
            title: '7. Security & Updates',
            content: `We implement robust security measures to protect your data. Although no system is infallible, we continually update our practices to safeguard your information.`
        }
    ];

    return (
        <Container>
            <Paper
                elevation={2}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: 'tints.tint3'
                }}
            >
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        backgroundImage: 'linear-gradient(to right, #fdf7ed, #fefaf4)',
                        borderBottom: '1px solid',
                        borderColor: 'shades.light'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                        <SecurityIcon sx={{ color: 'custom.highlight', fontSize: 32, mr: 1 }} />
                        <Typography variant="h5" component="h1" fontWeight="bold" sx={{ color: 'custom.highlight' }}>
                            Privacy Policy
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Last updated: March 8, 2025
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Your privacy is our priority. Please review our policy carefully.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography variant="body1" paragraph>
                        At ArtGlimpse, we value your trust and are committed to protecting your data as a seller. Below are details on our data practices.
                    </Typography>
                    {privacySections.map((section) => (
                        <Accordion
                            key={section.id}
                            expanded={expanded === section.id}
                            onChange={handleChange(section.id)}
                            sx={{
                                mb: 2,
                                '&:before': { display: 'none' },
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'shades.light',
                                borderRadius: '8px !important',
                                overflow: 'hidden'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'custom.highlight' }} />}
                                sx={{
                                    bgcolor: 'rgba(193, 121, 18, 0.05)',
                                    '&:hover': { bgcolor: 'rgba(193, 121, 18, 0.1)' }
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="600">
                                    {section.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" paragraph>
                                    {section.content}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'custom.highlight', mb: 1 }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            For any questions regarding our Privacy Policy, please email us at:
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                            <EmailIcon sx={{ color: 'custom.highlight', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                support@artglimpse.com
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                color: 'white',
                                bgcolor: 'custom.highlight',
                                '&:hover': { bgcolor: 'custom.accent' }
                            }}
                        >
                            Get in Touch
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Privacy;
