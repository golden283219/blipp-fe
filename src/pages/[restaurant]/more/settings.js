import {
  Box,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  initReactI18next,
  useTranslation,
} from 'react-i18next';
import DefaultCard from '../../../components/DefaultCard';
import SEO from '../../../components/seo';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
  container2: {},
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const SettingsPage = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const switchLang = lang => {
    i18n.use(initReactI18next).init({ lng: lang });
  };

  const languages = [
    { id: 'sv-SE', name: 'Svenska' },
    { id: 'en-EN', name: 'English' },
  ];

  const [currentLang, setCurrentLang] = useState('');

  useEffect(() => {
    const current = languages.find(
      i => i.id === i18n.language
    );
    if (!current) return;
    setCurrentLang(current.id);
  }, []);

  return (
    <Container className={styles.container}>
      <SEO title={t('Language')} />
      <Box className={styles.container2}>
        <DefaultCard className={styles.card}>
          <CardContent>
            <FormControl fullWidth>
              <InputLabel>{t('Language')}</InputLabel>
              <Select
                value={currentLang}
                onChange={event => {
                  setCurrentLang(event.target.value);
                  switchLang(event.target.value);
                }}
              >
                {languages.map(item => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </DefaultCard>
      </Box>
    </Container>
  );
};

export default SettingsPage;
