import React, { useState, useEffect, useRef } from "react";
import calculateShares from "../utils/calculateShares";
import { useTranslation } from "react-i18next";

const HeirFormSection1 = () => {
  const { t } = useTranslation();

  // Madhhab selection
  const [madhhab, setMadhhab] = useState("hanafi");

  // States for estate and heirs
  const [estateAmount, setEstateAmount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [goldAmount, setGoldAmount] = useState("");
  const [silverAmount, setSilverAmount] = useState("");
  const [realEstateAmount, setRealEstateAmount] = useState("");
  const [wives, setWives] = useState(0);
  const [husbandAlive, setHusbandAlive] = useState(false);
  const [sons, setSons] = useState(0);
  const [daughters, setDaughters] = useState(0);
  const [motherAlive, setMotherAlive] = useState(false);
  const [fatherAlive, setFatherAlive] = useState(false);
  const [brothers, setBrothers] = useState(0);
  const [sisters, setSisters] = useState(0);

  // New heirs for extended form
  const [grandsons, setGrandsons] = useState(0);
  const [granddaughters, setGranddaughters] = useState(0);

  const [grandfatherAlive, setGrandfatherAlive] = useState(false);
  const [maternalGrandmotherAlive, setMaternalGrandmotherAlive] = useState(false);
  const [paternalGrandmotherAlive, setPaternalGrandmotherAlive] = useState(false);

  const [maternalBrothers, setMaternalBrothers] = useState(0);
  const [maternalSisters, setMaternalSisters] = useState(0);
  const [paternalBrothers, setPaternalBrothers] = useState(0);
  const [paternalSisters, setPaternalSisters] = useState(0);

  const [fullNephews, setFullNephews] = useState(0);
  const [paternalNephews, setPaternalNephews] = useState(0);

  const [fullUncles, setFullUncles] = useState(0);
  const [paternalUncles, setPaternalUncles] = useState(0);

  const [fullCousins, setFullCousins] = useState(0);
  const [paternalCousins, setPaternalCousins] = useState(0);

  // Optional named heirs for personalised result
  const [namedHeirs, setNamedHeirs] = useState([
    { name: "", relation: "" },
    { name: "", relation: "" },
    { name: "", relation: "" },
  ]);

  const [result, setResult] = useState(null);
  const printRef = useRef();

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Collapse toggles for heir sections
  const [isAsabaOpen, setIsAsabaOpen] = useState(false);
  const [isDhawuOpen, setIsDhawuOpen] = useState(false);

  // Derive total estate amount from individual asset inputs
  useEffect(() => {
    const toNumber = (v) => (v === "" ? 0 : Number(v) || 0);
    const total =
      toNumber(cashAmount) +
      toNumber(goldAmount) +
      toNumber(silverAmount) +
      toNumber(realEstateAmount);
    if (total > 0) {
      setEstateAmount(String(total));
    } else {
      setEstateAmount("");
    }
  }, [cashAmount, goldAmount, silverAmount, realEstateAmount]);

  useEffect(() => {
    if (wives > 0 && husbandAlive) setHusbandAlive(false);
  }, [wives]);

  useEffect(() => {
    if (husbandAlive && wives > 0) setWives(0);
  }, [husbandAlive]);

  const handleCalculate = () => {
    // Validate all fields before calculating
    const { ok, errorList } = validateAll();
    if (!ok) {
      alert([t('validationPleaseFixErrors'), '', ...errorList].join('\n'));
      return;
    }
    // Sanitize inputs: ensure non-negative integers for all numeric fields
    const toInt = (n) => Math.max(0, Number.isFinite(Number(n)) ? Math.floor(Number(n)) : 0);
    const clean = {
      wives: toInt(wives),
      sons: toInt(sons),
      daughters: toInt(daughters),
      brothers: toInt(brothers),
      sisters: toInt(sisters),
      grandsons: toInt(grandsons),
      granddaughters: toInt(granddaughters),
      maternalBrothers: toInt(maternalBrothers),
      maternalSisters: toInt(maternalSisters),
      paternalBrothers: toInt(paternalBrothers),
      paternalSisters: toInt(paternalSisters),
      fullNephews: toInt(fullNephews),
      paternalNephews: toInt(paternalNephews),
      fullUncles: toInt(fullUncles),
      paternalUncles: toInt(paternalUncles),
      fullCousins: toInt(fullCousins),
      paternalCousins: toInt(paternalCousins),
    };
    const shares = calculateShares({
      wives: clean.wives,
      husbandAlive,
      sons: clean.sons,
      daughters: clean.daughters,
      motherAlive,
      fatherAlive,
      brothers: clean.brothers,
      sisters: clean.sisters,
      grandsons: clean.grandsons,
      granddaughters: clean.granddaughters,
      grandfatherAlive,
      maternalGrandmotherAlive,
      paternalGrandmotherAlive,
      maternalBrothers: clean.maternalBrothers,
      maternalSisters: clean.maternalSisters,
      paternalBrothers: clean.paternalBrothers,
      paternalSisters: clean.paternalSisters,
      fullNephews: clean.fullNephews,
      paternalNephews: clean.paternalNephews,
      fullUncles: clean.fullUncles,
      paternalUncles: clean.paternalUncles,
      fullCousins: clean.fullCousins,
      paternalCousins: clean.paternalCousins,
      madhhab,
    });
    setResult(shares);
  };

  const handleReset = () => {
    setEstateAmount("");
    setCashAmount("");
    setGoldAmount("");
    setSilverAmount("");
    setRealEstateAmount("");
    setWives(0);
    setHusbandAlive(false);
    setSons(0);
    setDaughters(0);
    setMotherAlive(false);
    setFatherAlive(false);
    setBrothers(0);
    setSisters(0);
    setGrandsons(0);
    setGranddaughters(0);
    setGrandfatherAlive(false);
    setMaternalGrandmotherAlive(false);
    setPaternalGrandmotherAlive(false);
    setMaternalBrothers(0);
    setMaternalSisters(0);
    setPaternalBrothers(0);
    setPaternalSisters(0);
    setFullNephews(0);
    setPaternalNephews(0);
    setFullUncles(0);
    setPaternalUncles(0);
    setFullCousins(0);
    setPaternalCousins(0);
    setNamedHeirs([
      { name: "", relation: "" },
      { name: "", relation: "" },
      { name: "", relation: "" },
    ]);
    setResult(null);
    setIsAsabaOpen(false);
    setIsDhawuOpen(false);
    setErrors({});
    setTouched({});
  };

  // =============== Validation helpers ===============
  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const validateNumber = (field, rawValue, { min = 0, max = undefined, requireNumber = false } = {}) => {
    if (requireNumber && (rawValue === "" || rawValue === null || rawValue === undefined)) {
      const msg = `${t('validationRequiredNumber')}. ${t('validationUseZeroIfNone')}`;
      setFieldError(field, msg);
      return { valid: false, msg };
    }
    const value = Number(rawValue);
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < min) {
      const msg = `${t('validationEnterNonNegativeInteger')}. ${t('validationUseZeroIfNone')}`;
      setFieldError(field, msg);
      return { valid: false, msg };
    }
    if (typeof max === 'number' && value > max) {
      // specialized messages
      if (field === 'wives') {
        const msg = t('validationMaxWives');
        setFieldError(field, msg);
        return { valid: false, msg };
      } else {
        const msg = `${t('validationEnterNonNegativeInteger')}`;
        setFieldError(field, msg);
        return { valid: false, msg };
      }
    }
    setFieldError(field, undefined);
    return { valid: true };
  };

  const handleNumberChange = (field, rawValue, setter, options = {}) => {
    // Allow empty string during typing
    if (rawValue === "") {
      setter("");
      if (touched[field]) validateNumber(field, rawValue, { requireNumber: true, ...options });
      return;
    }
    const numeric = Math.max(0, Math.floor(Number(rawValue)) || 0);
    setter(numeric);
    if (touched[field]) validateNumber(field, numeric, options);
  };

  const validateAll = () => {
    const fieldToLabelKey = {
      wives: 'numberOfWives',
      sons: 'numberOfSons',
      daughters: 'numberOfDaughters',
      brothers: 'numberOfBrothers',
      sisters: 'numberOfSisters',
      grandsons: 'grandsons',
      granddaughters: 'granddaughters',
      maternalBrothers: 'numberOfMaternalBrothers',
      maternalSisters: 'numberOfMaternalSisters',
      paternalBrothers: 'numberOfPaternalBrothers',
      paternalSisters: 'numberOfPaternalSisters',
      fullNephews: 'numberOfFullNephews',
      paternalNephews: 'numberOfPaternalNephews',
      fullUncles: 'numberOfFullUncles',
      paternalUncles: 'numberOfPaternalUncles',
      fullCousins: 'numberOfFullCousins',
      paternalCousins: 'numberOfPaternalCousins',
    };

    const toCheck = [
      ['wives', wives, { min: 0, max: 4, requireNumber: true }],
      ['sons', sons, { min: 0, requireNumber: true }],
      ['daughters', daughters, { min: 0, requireNumber: true }],
      ['brothers', brothers, { min: 0, requireNumber: true }],
      ['sisters', sisters, { min: 0, requireNumber: true }],
      ['grandsons', grandsons, { min: 0, requireNumber: true }],
      ['granddaughters', granddaughters, { min: 0, requireNumber: true }],
      ['maternalBrothers', maternalBrothers, { min: 0, requireNumber: true }],
      ['maternalSisters', maternalSisters, { min: 0, requireNumber: true }],
      ['paternalBrothers', paternalBrothers, { min: 0, requireNumber: true }],
      ['paternalSisters', paternalSisters, { min: 0, requireNumber: true }],
      ['fullNephews', fullNephews, { min: 0, requireNumber: true }],
      ['paternalNephews', paternalNephews, { min: 0, requireNumber: true }],
      ['fullUncles', fullUncles, { min: 0, requireNumber: true }],
      ['paternalUncles', paternalUncles, { min: 0, requireNumber: true }],
      ['fullCousins', fullCousins, { min: 0, requireNumber: true }],
      ['paternalCousins', paternalCousins, { min: 0, requireNumber: true }],
    ];

    const errorList = [];
    let ok = true;
    toCheck.forEach(([field, value, opts]) => {
      const { valid, msg } = validateNumber(field, value, opts);
      if (!valid) {
        ok = false;
        const labelKey = fieldToLabelKey[field] || field;
        errorList.push(`${t(labelKey)}: ${msg}`);
      }
      markTouched(field);
    });

    return { ok, errorList };
  };

  const renderError = (field) =>
    touched[field] && errors[field] ? (
      <p className="text-red-600 text-xs mt-1">{errors[field]}</p>
    ) : null;

  const handlePrint = () => {
    // Gather selected heirs and their shares
    if (!result) return;
    const selectedHeirs = [];
    if (wives > 0) selectedHeirs.push({ label: wives > 1 ? `${t('wives')} (${wives})` : t('wife'), share: result.wives, each: result.wivesEach });
    if (husbandAlive) selectedHeirs.push({ label: t('husband'), share: result.husband });
    if (sons > 0) selectedHeirs.push({ label: sons > 1 ? `${t('sons')} (${sons})` : t('son'), share: result.sons });
    if (daughters > 0) selectedHeirs.push({ label: daughters > 1 ? `${t('daughters')} (${daughters})` : t('daughter'), share: result.daughters });
    if (motherAlive) selectedHeirs.push({ label: t('mother'), share: result.mother });
    if (fatherAlive) selectedHeirs.push({ label: t('father'), share: result.father });
    if (brothers > 0) selectedHeirs.push({ label: brothers > 1 ? `${t('brothers')} (${brothers})` : t('brother'), share: result.brothers });
    if (sisters > 0) selectedHeirs.push({ label: sisters > 1 ? `${t('sisters')} (${sisters})` : t('sister'), share: result.sisters });
    if (grandsons > 0) selectedHeirs.push({ label: grandsons > 1 ? `${t('grandsons')} (${grandsons})` : t('grandson'), share: result.grandsons });
    if (granddaughters > 0) selectedHeirs.push({ label: granddaughters > 1 ? `${t('granddaughters')} (${granddaughters})` : t('granddaughter'), share: result.granddaughters });
    if (grandfatherAlive) selectedHeirs.push({ label: t('grandfather'), share: result.grandfather });
    if (maternalGrandmotherAlive) selectedHeirs.push({ label: t('maternalGrandmother'), share: result.maternalGrandmother });
    if (paternalGrandmotherAlive) selectedHeirs.push({ label: t('paternalGrandmother'), share: result.paternalGrandmother });
    if (maternalBrothers > 0) selectedHeirs.push({ label: maternalBrothers > 1 ? `${t('maternalBrothers')} (${maternalBrothers})` : t('maternalBrother'), share: result.maternalBrothers });
    if (maternalSisters > 0) selectedHeirs.push({ label: maternalSisters > 1 ? `${t('maternalSisters')} (${maternalSisters})` : t('maternalSister'), share: result.maternalSisters });
    if (paternalBrothers > 0) selectedHeirs.push({ label: paternalBrothers > 1 ? `${t('paternalBrothers')} (${paternalBrothers})` : t('paternalBrother'), share: result.paternalBrothers });
    if (paternalSisters > 0) selectedHeirs.push({ label: paternalSisters > 1 ? `${t('paternalSisters')} (${paternalSisters})` : t('paternalSister'), share: result.paternalSisters });
    if (fullNephews > 0) selectedHeirs.push({ label: fullNephews > 1 ? `${t('fullNephews')} (${fullNephews})` : t('fullNephew'), share: result.fullNephews });
    if (paternalNephews > 0) selectedHeirs.push({ label: paternalNephews > 1 ? `${t('paternalNephews')} (${paternalNephews})` : t('paternalNephew'), share: result.paternalNephews });
    if (fullUncles > 0) selectedHeirs.push({ label: fullUncles > 1 ? `${t('fullUncles')} (${fullUncles})` : t('fullUncle'), share: result.fullUncles });
    if (paternalUncles > 0) selectedHeirs.push({ label: paternalUncles > 1 ? `${t('paternalUncles')} (${paternalUncles})` : t('paternalUncle'), share: result.paternalUncles });
    if (fullCousins > 0) selectedHeirs.push({ label: fullCousins > 1 ? `${t('fullCousins')} (${fullCousins})` : t('fullCousin'), share: result.fullCousins });
    if (paternalCousins > 0) selectedHeirs.push({ label: paternalCousins > 1 ? `${t('paternalCousins')} (${paternalCousins})` : t('paternalCousin'), share: result.paternalCousins });
    if (result.baytulmal > 0) selectedHeirs.push({ label: t('baytulmal'), share: result.baytulmal });

    let tableRows = '';
    selectedHeirs.forEach((heir) => {
      const percentage = (heir.share * 100).toFixed(2) + '%';
      const eachPercentage = (() => {
        if (heir.label === t('wife') || heir.label.startsWith(`${t('wives')} (`)) return result.wivesEach ? (result.wivesEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('son') || heir.label.startsWith(`${t('sons')} (`)) return result.sonsEach ? (result.sonsEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('daughter') || heir.label.startsWith(`${t('daughters')} (`)) return result.daughtersEach ? (result.daughtersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('brother') || heir.label.startsWith(`${t('brothers')} (`)) return result.brothersEach ? (result.brothersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('sister') || heir.label.startsWith(`${t('sisters')} (`)) return result.sistersEach ? (result.sistersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('paternalBrother') || heir.label.startsWith(`${t('paternalBrothers')} (`)) return result.paternalBrothersEach ? (result.paternalBrothersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('paternalSister') || heir.label.startsWith(`${t('paternalSisters')} (`)) return result.paternalSistersEach ? (result.paternalSistersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('maternalBrother') || heir.label.startsWith(`${t('maternalBrothers')} (`)) return result.maternalBrothersEach ? (result.maternalBrothersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('maternalSister') || heir.label.startsWith(`${t('maternalSisters')} (`)) return result.maternalSistersEach ? (result.maternalSistersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('grandson') || heir.label.startsWith(`${t('grandsons')} (`)) return result.grandsonsEach ? (result.grandsonsEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('granddaughter') || heir.label.startsWith(`${t('granddaughters')} (`)) return result.granddaughtersEach ? (result.granddaughtersEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('fullNephew') || heir.label.startsWith(`${t('fullNephews')} (`)) return result.fullNephewsEach ? (result.fullNephewsEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('paternalNephew') || heir.label.startsWith(`${t('paternalNephews')} (`)) return result.paternalNephewsEach ? (result.paternalNephewsEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('fullUncle') || heir.label.startsWith(`${t('fullUncles')} (`)) return result.fullUnclesEach ? (result.fullUnclesEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('paternalUncle') || heir.label.startsWith(`${t('paternalUncles')} (`)) return result.paternalUnclesEach ? (result.paternalUnclesEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('fullCousin') || heir.label.startsWith(`${t('fullCousins')} (`)) return result.fullCousinsEach ? (result.fullCousinsEach * 100).toFixed(2) + '%' : '';
        if (heir.label === t('paternalCousin') || heir.label.startsWith(`${t('paternalCousins')} (`)) return result.paternalCousinsEach ? (result.paternalCousinsEach * 100).toFixed(2) + '%' : '';
        return '';
      })();

      const totalAmount = isEstateAmountValid ? formatMoney(heir.share * Number(estateAmount)) : '';
      const eachAmount = (() => {
        if (!isEstateAmountValid) return '';
        if (eachPercentage === '') return '';
        const eachShare = Number(eachPercentage.replace('%','')) / 100;
        return formatMoney(eachShare * Number(estateAmount));
      })();

      tableRows += `<tr>` +
        `<td>${heir.label}</td>` +
        `<td>${percentage}</td>` +
        `<td>${eachPercentage || '-'}</td>` +
        `<td>${totalAmount || '-'}</td>` +
        `<td>${eachAmount || '-'}</td>` +
      `</tr>`;
    });
    

    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write('<html><head><title>Inheritance Shares</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;color:#4A4A4A} h1{color:#DC9B83} table{width:100%;border-collapse:collapse;margin-top:20px} th,td{border:1px solid #E8BCA8;padding:8px;text-align:left} th{background:#FAFAFA;color:#DC9B83}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1 style="font-size:2.2em;color:#DC9B83;margin-bottom:0.2em;">MyMirath</h1>');
    printWindow.document.write('<div style="color:#888;font-size:1.1em;margin-bottom:1.5em;">Islamic Inheritance Calculator</div>');
    const l = {
      heirs: t('selectedHeirs'),
      heir: t('heir') || 'Heir',
      wholeShare: t('wholeShare') || 'Whole Share',
      eachShare: t('eachShare') || 'Each Share',
      wholeAmount: t('wholeAmount') || 'Whole Amount',
      eachAmount: t('eachAmount') || 'Each Amount'
    };
    printWindow.document.write(`<h2 style="color:#DC9B83;margin-bottom:1em;">${l.heirs}</h2>`);
    printWindow.document.write(`<table><thead><tr><th>${l.heir}</th><th>${l.wholeShare}</th><th>${l.eachShare}</th><th>${l.wholeAmount}</th><th>${l.eachAmount}</th></tr></thead><tbody>`);
    printWindow.document.write(tableRows);
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const formatMoney = (value) =>
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const isEstateAmountValid =
    estateAmount !== "" && !isNaN(estateAmount) && Number(estateAmount) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7F3] via-[#FAFAFA] to-[#FFFFFF] flex flex-col items-center px-3 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#DC9B83] mb-2 sm:mb-4 text-center">
        {t('calculatorTitle')}
      </h1>
      <p className="text-xs sm:text-sm text-[#7A7A7A] mb-4 sm:mb-6 max-w-2xl text-center">
        {t('selectOnlyTheHeirsWhoAreAliveAtTheTimeOfDeath')}
      </p>
      {Object.values(errors).some(Boolean) && (
        <div className="w-full max-w-7xl mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
          {t('validationPleaseFixErrors')}
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl">
{/* LEFT - Guidelines */}

<div className="flex-1 bg-[#FFFFFF] border border-[#E8BCA8] rounded-lg shadow-md p-6 text-[#4A4A4A] min-w-[260px] sm:min-w-[280px] max-w-full lg:max-w-[320px] overflow-y-auto max-h-[calc(90vh)]">
  <h2 className="text-2xl font-semibold text-[#DC9B83] mb-3">{t('proofsOfShares')}</h2>

  <p className="text-[#9A9A9A] text-sm mb-4">
    {t('islamicInheritanceCalculator')}
  </p>

  <h3 className="text-lg font-semibold text-[#DC9B83] mb-2">{t('primaryHeirs')}</h3>

  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('husband')}:</strong><br />
      ➤ <em>½</em> {t('ifNoChildren')}<br />
      ➤ <em>¼</em> {t('ifSheHasChildren')}<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:12]</span>
    </li>

    <li>
      <strong>{t('wife')}:</strong><br />
      ➤ <em>¼</em> {t('ifNoChildren')}<br />
      ➤ <em>⅛</em> {t('ifChildrenExist')} (shared equally)<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:12]</span>
    </li>

    <li>
      <strong>{t('sonsAndDaughters')}:</strong><br />
      ➤ {t('ifOnlyDaughters')}<ul className="list-disc ml-5">
        <li>{t('oneDaughter')} → <em>½</em></li>
        <li>{t('twoOrMore')} → {t('share')} <em>⅔</em></li>
      </ul>
      ➤ {t('ifSonsAndDaughters')} → {t('shareResidue')}, {t('eachSonGetsTwoDaughters')}<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:11]</span>
    </li>

    <li>
      <strong>{t('mother')}:</strong><br />
      ➤ <em>⅙</em> {t('ifChildrenOrTwoPlusSiblings')}<br />
      ➤ <em>⅓</em> {t('ifNoChildrenAndLessThanTwoSiblings')}<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:11]</span>
    </li>

    <li>
      <strong>{t('father')}:</strong><br />
      ➤ <em>⅙</em> {t('ifChildrenExist')}<br />
      ➤ {t('takesResidue')} {t('ifNoChildren')}<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:11]</span>
    </li>

    <li>
      <strong>{t('siblings')}:</strong><br />
      ➤ {t('doNotInherit')} {t('ifChildrenOrFatherExist')}<br />
      ➤ {t('mayInheritAsResiduary')} {t('ifNoChildrenAndNoFather')}<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:12, 4:176]</span>
    </li>
  </ul>

  {/* === New Section: Grandchildren === */}
  <h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('grandchildren')}</h3>
  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('grandsons')}:</strong><br />
      ➤ {t('inheritOnlyIfTheirFather')} (the deceased's son) {t('isDeceased')}.<br />
      ➤ {t('shareResidue')} {t('withGranddaughters')}; {t('eachGrandsonGetsTwiceTheShareOfAGranddaughter')}.<br />
      ➤ {t('blockSiblingsUnclesNephewsCousinsAndGrandfather')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Tafsir Ibn Abbas; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanbali Fiqh: "Al-Mughni" by Ibn Qudamah]
      </span>
    </li>
    <li>
      <strong>{t('granddaughters')}:</strong><br />
      ➤ {t('inheritOnlyIfTheirFatherIsDeceased')}.<br />
      ➤ {t('getFixedSharesIfNoGrandsons')}: {t('oneGranddaughterGetsHalf')}, {t('twoOrMoreGranddaughtersShareTwoThirds')}.<br />
      ➤ {t('shareResidue')} {t('withGrandsons')}; {t('eachGranddaughterReceivesHalfTheShareOfAGrandson')}.<br />
      ➤ {t('blockSiblingsUnclesNephewsCousinsAndGrandfather')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Tafsir Al-Jalalayn; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanbali Fiqh: "Bidayat al-Mujtahid" by Ibn Rushd]
      </span>
    </li>
  </ul>

  {/* === New Section: Grandparents === */}
  <h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('grandparents')}</h3>
  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('grandfather')}:</strong><br />
      ➤ {t('blockedByFatherSonsGrandsonsAndDaughters')}.<br />
      ➤ {t('blocksHalfSiblingsUnclesNephewsAndCousins')}.<br />
      ➤ {t('inheritsResidueIfNoCloserHeirsExist')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Mabsut" by Al-Sarakhsi; Hanbali Fiqh: "Al-Mughni" by Ibn Qudamah]
      </span>
    </li>
    <li>
      <strong>{t('maternalGrandmother')}:</strong><br />
      ➤ {t('blockedByParentsChildrenGrandchildrenAndSiblings')}.<br />
      ➤ {t('blocksUnclesNephewsAndCousins')}.<br />
      ➤ {t('getsFixedShareOfOneSixthIfEligible')}.<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:11; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]</span>
    </li>
    <li>
      <strong>{t('paternalGrandmother')}:</strong><br />
      ➤ {t('blockedByParentsChildrenGrandchildrenAndSiblings')}.<br />
      ➤ {t('blocksUnclesNephewsAndCousins')}.<br />
      ➤ {t('getsFixedShareOfOneSixthIfEligible')}.<br />
      <span className="text-[#9A9A9A]">[Surah An-Nisa 4:11; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]</span>
    </li>
  </ul>

  {/* === New Section: Maternal & Paternal Siblings === */}
  <h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('maternalAndPaternalSiblings')}</h3>
  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('paternalBrothers')}:</strong><br />
      ➤ {t('blockedBySonsGrandsonsFatherAndFullBrothers')}.<br />
      ➤ {t('blocksMaternalSiblingsUnclesNephewsAndCousins')}.<br />
      ➤ {t('inheritsAsResiduaryHeirsWithTwoToOneRatio')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]
      </span>
    </li>
    <li>
      <strong>{t('paternalSisters')}:</strong><br />
      ➤ {t('blockedBySonsGrandsonsFatherFullBrothersSistersAndGrandfather')}.<br />
      ➤ {t('blocksMaternalSiblingsUnclesNephewsAndCousins')}.<br />
      ➤ {t('inheritsAsResiduaryHeirsWithOneToOneRatio')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]
      </span>
    </li>
    <li>
      <strong>{t('maternalBrothers')}:</strong><br />
      ➤ {t('blockedBySonsDaughtersFatherFullBrothersSistersGrandfatherGrandsonsAndPaternalSiblings')}.<br />
      ➤ {t('blocksUnclesNephewsAndCousins')}.<br />
      ➤ {t('getsFixedShareOfOneSixthCollectively')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:12; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]
      </span>
    </li>
    <li>
      <strong>{t('maternalSisters')}:</strong><br />
      ➤ {t('blockedBySonsDaughtersFatherGrandfatherFullBrothersPaternalUnclesAndPaternalSiblings')}.<br />
      ➤ {t('blocksUnclesNephewsAndCousins')}.<br />
      ➤ {t('getsFixedShareOfOneSixthCollectively')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:12; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]
      </span>
    </li>
  </ul>

  {/* === New Section: Nephews === */}
  <h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('nephews')}</h3>
  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('fullNephews')}:</strong><br />
      ➤ {t('inheritOnlyIfSonsOfTheDeceasedAreDeceased')}.<br />
      ➤ {t('shareTheResidueWithNieces')}; {t('eachNephewGetsTwiceTheShareOfANiece')}.<br />
      ➤ {t('blockedIfTheDeceasedSonsAreAlive')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11; Tafsir Ibn Abbas; Maliki Fiqh: "Al-Iqna'"; Hanbali Fiqh: "Al-Mughni"]
      </span>
    </li>
    <li>
      <strong>{t('paternalNephews')}:</strong><br />
      ➤ {t('inheritOnlyIfSonsOfTheDeceasedAndFullNephewsAreDeceased')}.<br />
      ➤ {t('shareResidueSimilarlyWithFullNephews')}.<br />
      ➤ {t('blockedByPresenceOfSonsOrFullNephews')}.<br />
      <span className="text-[#9A9A9A]">
        [Maliki Fiqh: "Al-Iqna'"; Hanafi Fiqh: "Al-Mabsut"; Hanbali Fiqh: "Al-Mughni"]
      </span>
    </li>
  </ul>

  {/* === New Section: Uncles === */}
  <h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('uncles')}</h3>
  <ul className="text-sm space-y-2 list-disc list-inside">
    <li>
      <strong>{t('fullUncles')}:</strong><br />
      ➤ {t('inheritOnlyIfTheFatherIsDeceasedAndNoSonsOrDaughtersExist')}
      <br />
      ➤ {t('doNotInheritIfTheGrandfatherIsAlive')} (grandfather blocks full uncles).<br />
      ➤ {t('takeTheResidue')} (remaining estate) {t('asResiduaryHeirsAsaba')}.<br />
      <span className="text-[#9A9A9A]">
        [Surah An-Nisa 4:11, 4:12; Tafsir Ibn Kathir; Maliki Fiqh: "Al-Iqna'"; Hanafi Fiqh: "Al-Mabsut" by Al-Sarakhsi]
      </span>
    </li>
    <li>
      <strong>{t('paternalUncles')}:</strong><br />
      ➤ {t('inheritOnlyIfTheFatherAndFullUnclesAreDeceasedAndNoSonsOrDaughtersExist')}
      <br />
      ➤ {t('takeResidueAsResiduaryHeirs')}.<br />
      ➤ {t('blockedByPresenceOfFatherSonsDaughtersOrFullUncles')}.<br />
      <span className="text-[#9A9A9A]">
        [Maliki Fiqh: "Al-Iqna'"; Hanafi Fiqh: "Al-Mabsut"; Hanbali Fiqh: "Al-Mughni"]
      </span>
    </li>

  </ul>

  {/* === New Section: Cousins === */}
<h3 className="text-lg font-semibold text-[#DC9B83] mt-6 mb-2">{t('cousins')}</h3>
<ul className="text-sm space-y-2 list-disc list-inside">
  <li>
    <strong>{t('fullCousins')}:</strong><br />
    ➤ {t('inheritOnlyIfNoCloserHeirsExist')} (no father, children, siblings, nephews, or uncles).<br />
    ➤ {t('takeTheEntireResidueAsResiduaryHeirs')}.<br />
    <span className="text-[#9A9A9A]">
      [Quran 8:75; Hadith Sahih Muslim; Maliki Fiqh: "Al-Iqna'" by Al-Qarafi; Hanafi Fiqh: "Al-Hidayah" by Al-Marghinani]
    </span>
  </li>
  <li>
    <strong>{t('paternalCousins')}:</strong><br />
    ➤ {t('inheritOnlyIfNoCloserHeirsAndNoFullCousinsExist')}.<br />
    ➤ {t('takeResidueAsResiduaryHeirsIfEligible')}.<br />
    <span className="text-[#9A9A9A]">
      [Quran 4:12, 4:176; Tafsir Ibn Kathir; Hanbali Fiqh: "Al-Mughni" by Ibn Qudamah]
    </span>
  </li>
  <li>
    <em>{t('note')}:</em> {t('cousinsArePartOfDhawuAlArham')} (distant kindred) and {t('inheritOnlyInAbsenceOfCloserHeirs')}.<br />
    {t('consultAQualifiedScholarForComplexCases')}.
  </li>
</ul>


  <p className="mt-4 text-xs text-[#9A9A9A]">
    {t('complexCasesConsultAQualifiedIslamicScholar')}
  </p>
</div>


        {/* MIDDLE - Calculator Form + Result */}
        <div
          ref={printRef}
          className="flex-[2] bg-[#FFFFFF] border border-[#E8BCA8] rounded-lg shadow-md p-4 sm:p-6 max-w-full"
        >
          {/* Madhhab selector */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="block text-xs uppercase tracking-wide text-[#9A9A9A] mb-1">
                {t('madhhab') || 'Madhhab'}
              </span>
              <div className="inline-flex rounded-full border border-[#E8BCA8] bg-[#FFF7F3] overflow-hidden text-xs sm:text-sm">
                {[
                  { id: "hanafi", label: t('hanafi') || "Hanafi" },
                  { id: "shafii", label: t('shafii') || "Shafi'i" },
                  { id: "maliki", label: t('maliki') || "Maliki" },
                  { id: "hanbali", label: t('hanbali') || "Hanbali" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMadhhab(m.id)}
                    className={`px-3 py-1 ${
                      madhhab === m.id
                        ? "bg-[#DC9B83] text-white"
                        : "bg-transparent text-[#4A4A4A]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-[#9A9A9A]">
              {t('madhhabNote') ||
                "Currently using a unified rule set; detailed madhhab differences will be added with scholar review."}
            </p>
          </div>

          {/* Estate Amount (multi-asset) */}
          <div className="mb-6 border border-dashed border-[#E8BCA8] rounded-md p-3 sm:p-4 bg-[#FFF9F6]">
            <p className="text-xs font-medium text-[#4A4A4A] mb-2">
              {t('totalEstateAmount')} ({t('optional') || 'Optional'})
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#7A7A7A] mb-1" htmlFor="cashAmount">
                  {t('cash') || 'Cash'} ({t('inMoney') || 'in money'})
            </label>
            <input
                  id="cashAmount"
              type="number"
              min={0}
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC9B83]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7A7A7A] mb-1" htmlFor="goldAmount">
                  {t('gold') || 'Gold'} ({t('inMoney') || 'in money'})
                </label>
                <input
                  id="goldAmount"
                  type="number"
                  min={0}
                  value={goldAmount}
                  onChange={(e) => setGoldAmount(e.target.value)}
                  className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC9B83]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7A7A7A] mb-1" htmlFor="silverAmount">
                  {t('silver') || 'Silver'} ({t('inMoney') || 'in money'})
                </label>
                <input
                  id="silverAmount"
                  type="number"
                  min={0}
                  value={silverAmount}
                  onChange={(e) => setSilverAmount(e.target.value)}
                  className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC9B83]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7A7A7A] mb-1" htmlFor="realEstateAmount">
                  {t('realEstate') || 'Real estate'} ({t('inMoney') || 'in money'})
                </label>
                <input
                  id="realEstateAmount"
                  type="number"
                  min={0}
                  value={realEstateAmount}
                  onChange={(e) => setRealEstateAmount(e.target.value)}
                  className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC9B83]"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#4A4A4A]">
              {t('totalEstateCalculated') || 'Total estate used in calculation'}:{' '}
              <span className="font-semibold">
                {estateAmount !== ""
                  ? formatMoney(Number(estateAmount))
                  : t('percentageOnly') || 'percentages only'}
              </span>
            </p>
            <p className="text-[10px] text-[#9A9A9A] mt-1">
              {t('leaveEmptyToGetPercentageSharesOnly')}
            </p>
          </div>

          {/* Optional named heirs */}
          <div className="mb-6">
            <p className="text-xs font-medium text-[#4A4A4A] mb-2">
              {t('optionalNamedHeirs') ||
                'Optional: add up to three named heirs so results show their names and whether they inherit.'}
            </p>
            <div className="space-y-2">
              {namedHeirs.map((h, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center"
                >
                  <input
                    type="text"
                    placeholder={t('heirNameOptional') || 'Heir name (optional)'}
                    value={h.name}
                    onChange={(e) => {
                      const next = [...namedHeirs];
                      next[idx] = { ...next[idx], name: e.target.value };
                      setNamedHeirs(next);
                    }}
                    className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#DC9B83]"
                  />
                  <select
                    value={h.relation}
                    onChange={(e) => {
                      const next = [...namedHeirs];
                      next[idx] = { ...next[idx], relation: e.target.value };
                      setNamedHeirs(next);
                    }}
                    className="w-full border border-[#E8BCA8] rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#DC9B83]"
                  >
                    <option value="">{t('selectRelation') || 'Select relation'}</option>
                    <option value="daughter">{t('daughter')}</option>
                    <option value="son">{t('son')}</option>
                    <option value="father">{t('father')}</option>
                    <option value="mother">{t('mother')}</option>
                    <option value="wife">{t('wife')}</option>
                    <option value="husband">{t('husband')}</option>
                    <option value="brother">{t('brother')}</option>
                    <option value="sister">{t('sister')}</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* ==== Primary Heirs Section ==== */}
          <div className="mb-8 border-b border-[#E8BCA8] pb-6">
            <h2 className="text-2xl font-semibold text-[#DC9B83] mb-4">{t('primaryHeirs')}</h2>

            {/* Spouse */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-medium text-[#4A4A4A]">{t('numberOfWives')}:</label>
                <input
                  type="number"
                  min={0}
                  max={4}
                  value={wives}
                  onChange={(e) => handleNumberChange('wives', e.target.value, setWives, { min: 0, max: 4 })}
                  onBlur={() => { markTouched('wives'); validateNumber('wives', wives, { min: 0, max: 4 }); }}
                  className={`w-full border rounded px-3 py-2 ${errors.wives ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                  disabled={husbandAlive}
                />
                {renderError('wives')}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={husbandAlive}
                  onChange={(e) => setHusbandAlive(e.target.checked)}
                  id="husbandAlive"
              className="w-4 h-4 accent-[#DC9B83]"
                  disabled={wives > 0}
                />
                <label htmlFor="husbandAlive" className="font-medium text-[#4A4A4A]">
                  {t('husbandAlive')}
                </label>
              </div>
            </div>

            {/* Children */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-medium text-[#4A4A4A]">{t('numberOfSons')}:</label>
                <input
                  type="number"
                  min={0}
                  value={sons}
                  onChange={(e) => handleNumberChange('sons', e.target.value, setSons)}
                  onBlur={() => { markTouched('sons'); validateNumber('sons', sons, { min: 0 }); }}
              className={`w-full border rounded px-3 py-2 ${errors.sons ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                />
                {renderError('sons')}
              </div>
              <div>
                <label className="block font-medium text-[#4A4A4A]">{t('numberOfDaughters')}:</label>
                <input
                  type="number"
                  min={0}
                  value={daughters}
                  onChange={(e) => handleNumberChange('daughters', e.target.value, setDaughters)}
                  onBlur={() => { markTouched('daughters'); validateNumber('daughters', daughters, { min: 0 }); }}
              className={`w-full border rounded px-3 py-2 ${errors.daughters ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                />
                {renderError('daughters')}
              </div>
            </div>

            {/* Parents */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={motherAlive}
                  onChange={(e) => setMotherAlive(e.target.checked)}
                  id="motherAlive"
                  className="w-4 h-4 accent-[#DC9B83]"
                />
                <label htmlFor="motherAlive" className="font-medium text-[#4A4A4A]">
                  {t('motherAlive')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={fatherAlive}
                  onChange={(e) => setFatherAlive(e.target.checked)}
                  id="fatherAlive"
                  className="w-4 h-4 accent-[#DC9B83]"
                />
                <label htmlFor="fatherAlive" className="font-medium text-[#4A4A4A]">
                  {t('fatherAlive')}
                </label>
              </div>
            </div>

            {/* Siblings */}
            <div className="space-y-4 mb-6 border-t border-[#E8BCA8] pt-4">
              <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('siblings')}</h3>
              <div>
                <label className="block font-medium text-[#4A4A4A]">{t('numberOfBrothers')}:</label>
                <input
                  type="number"
                  min={0}
                  value={brothers}
                  onChange={(e) => handleNumberChange('brothers', e.target.value, setBrothers)}
                  onBlur={() => { markTouched('brothers'); validateNumber('brothers', brothers, { min: 0 }); }}
                  className={`w-full border rounded px-3 py-2 ${errors.brothers ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                />
                {renderError('brothers')}
              </div>
              <div>
                <label className="block font-medium text-[#4A4A4A]">{t('numberOfSisters')}:</label>
                <input
                  type="number"
                  min={0}
                  value={sisters}
                  onChange={(e) => handleNumberChange('sisters', e.target.value, setSisters)}
                  onBlur={() => { markTouched('sisters'); validateNumber('sisters', sisters, { min: 0 }); }}
                  className={`w-full border rounded px-3 py-2 ${errors.sisters ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                />
                {renderError('sisters')}
              </div>
            </div>
          </div>

          {/* ==== Residuary Heirs (Asaba) Section - collapsible ==== */}
          <div className="mb-8 border-b border-[#E8BCA8] pb-6">
            <h2
              className="text-2xl font-semibold text-[#DC9B83] mb-4 cursor-pointer select-none"
              onClick={() => setIsAsabaOpen(!isAsabaOpen)}
              aria-expanded={isAsabaOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsAsabaOpen(!isAsabaOpen);
                }
              }}
            >
              {t('residuaryHeirsAsaba')} {isAsabaOpen ? "▲" : "▼"}
            </h2>
            {isAsabaOpen && (
              <>
                {/* Grandchildren */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('grandchildren')}</h3>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('grandsons')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={grandsons}
                      onChange={(e) => handleNumberChange('grandsons', e.target.value, setGrandsons)}
                      onBlur={() => { markTouched('grandsons'); validateNumber('grandsons', grandsons, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.grandsons ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('grandsons')}
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('granddaughters')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={granddaughters}
                      onChange={(e) => handleNumberChange('granddaughters', e.target.value, setGranddaughters)}
                      onBlur={() => { markTouched('granddaughters'); validateNumber('granddaughters', granddaughters, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.granddaughters ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('granddaughters')}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ==== Distant Kindred (Dhawu al-Arham) Section - collapsible ==== */}
          <div>
            <h2
              className="text-2xl font-semibold text-[#DC9B83] mb-4 cursor-pointer select-none"
              onClick={() => setIsDhawuOpen(!isDhawuOpen)}
              aria-expanded={isDhawuOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsDhawuOpen(!isDhawuOpen);
                }
              }}
            >
              {t('distantKindredDhawuAlArham')} {isDhawuOpen ? "▲" : "▼"}
            </h2>
            {isDhawuOpen && (
              <>
                {/* Grandparents */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('grandparents')}</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={grandfatherAlive}
                      onChange={(e) => setGrandfatherAlive(e.target.checked)}
                      id="grandfatherAlive"
                      className="w-4 h-4 accent-[#DC9B83]"
                    />
                    <label htmlFor="grandfatherAlive" className="font-medium text-[#4A4A4A]">
                      {t('grandfatherAlive')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={maternalGrandmotherAlive}
                      onChange={(e) => setMaternalGrandmotherAlive(e.target.checked)}
                      id="maternalGrandmotherAlive"
                      className="w-4 h-4 accent-[#DC9B83]"
                    />
                    <label htmlFor="maternalGrandmotherAlive" className="font-medium text-[#4A4A4A]">
                      {t('maternalGrandmotherAlive')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={paternalGrandmotherAlive}
                      onChange={(e) => setPaternalGrandmotherAlive(e.target.checked)}
                      id="paternalGrandmotherAlive"
                      className="w-4 h-4 accent-[#DC9B83]"
                    />
                    <label htmlFor="paternalGrandmotherAlive" className="font-medium text-[#4A4A4A]">
                      {t('paternalGrandmotherAlive')}
                    </label>
                  </div>
                </div>

                {/* Maternal and Paternal Siblings */}
                <div className="space-y-4 mb-6 border-t border-[#E8BCA8] pt-4">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('maternalAndPaternalSiblings')}</h3>
                  
                  {/* Maternal Siblings */}
                  <div className="space-y-4 mb-4">
                    <h4 className="text-lg font-medium text-[#4A4A4A]">{t('maternalSiblings')}</h4>
                    <div>
                      <label className="block font-medium text-[#4A4A4A]">{t('numberOfMaternalBrothers')}:</label>
                      <input
                        type="number"
                        min={0}
                        value={maternalBrothers}
                        onChange={(e) => handleNumberChange('maternalBrothers', e.target.value, setMaternalBrothers)}
                        onBlur={() => { markTouched('maternalBrothers'); validateNumber('maternalBrothers', maternalBrothers, { min: 0 }); }}
                        className={`w-full border rounded px-3 py-2 ${errors.maternalBrothers ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                      />
                      {renderError('maternalBrothers')}
                    </div>
                    <div>
                      <label className="block font-medium text-[#4A4A4A]">{t('numberOfMaternalSisters')}:</label>
                      <input
                        type="number"
                        min={0}
                        value={maternalSisters}
                        onChange={(e) => handleNumberChange('maternalSisters', e.target.value, setMaternalSisters)}
                        onBlur={() => { markTouched('maternalSisters'); validateNumber('maternalSisters', maternalSisters, { min: 0 }); }}
                        className={`w-full border rounded px-3 py-2 ${errors.maternalSisters ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                      />
                      {renderError('maternalSisters')}
                    </div>
                  </div>

                  {/* Paternal Siblings */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-[#4A4A4A]">{t('paternalSiblings')}</h4>
                    <div>
                      <label className="block font-medium text-[#4A4A4A]">{t('numberOfPaternalBrothers')}:</label>
                      <input
                        type="number"
                        min={0}
                        value={paternalBrothers}
                        onChange={(e) => handleNumberChange('paternalBrothers', e.target.value, setPaternalBrothers)}
                        onBlur={() => { markTouched('paternalBrothers'); validateNumber('paternalBrothers', paternalBrothers, { min: 0 }); }}
                        className={`w-full border rounded px-3 py-2 ${errors.paternalBrothers ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                      />
                      {renderError('paternalBrothers')}
                    </div>
                    <div>
                      <label className="block font-medium text-[#4A4A4A]">{t('numberOfPaternalSisters')}:</label>
                      <input
                        type="number"
                        min={0}
                        value={paternalSisters}
                        onChange={(e) => handleNumberChange('paternalSisters', e.target.value, setPaternalSisters)}
                        onBlur={() => { markTouched('paternalSisters'); validateNumber('paternalSisters', paternalSisters, { min: 0 }); }}
                        className={`w-full border rounded px-3 py-2 ${errors.paternalSisters ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                      />
                      {renderError('paternalSisters')}
                    </div>
                  </div>
                </div>

                {/* Nephews */}
                <div className="space-y-4 mb-6 border-t border-[#E8BCA8] pt-4">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('nephews')}</h3>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfFullNephews')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={fullNephews}
                      onChange={(e) => handleNumberChange('fullNephews', e.target.value, setFullNephews)}
                      onBlur={() => { markTouched('fullNephews'); validateNumber('fullNephews', fullNephews, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.fullNephews ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('fullNephews')}
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfPaternalNephews')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={paternalNephews}
                      onChange={(e) => handleNumberChange('paternalNephews', e.target.value, setPaternalNephews)}
                      onBlur={() => { markTouched('paternalNephews'); validateNumber('paternalNephews', paternalNephews, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.paternalNephews ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('paternalNephews')}
                  </div>
                </div>

                {/* Uncles */}
                <div className="space-y-4 mb-6 border-t border-[#E8BCA8] pt-4">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('uncles')}</h3>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfFullUncles')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={fullUncles}
                      onChange={(e) => handleNumberChange('fullUncles', e.target.value, setFullUncles)}
                      onBlur={() => { markTouched('fullUncles'); validateNumber('fullUncles', fullUncles, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.fullUncles ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('fullUncles')}
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfPaternalUncles')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={paternalUncles}
                      onChange={(e) => handleNumberChange('paternalUncles', e.target.value, setPaternalUncles)}
                      onBlur={() => { markTouched('paternalUncles'); validateNumber('paternalUncles', paternalUncles, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.paternalUncles ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('paternalUncles')}
                  </div>
                </div>

                {/* Cousins */}
                <div className="space-y-4 mb-6 border-t border-[#E8BCA8] pt-4">
                  <h3 className="text-xl font-semibold text-[#DC9B83] mb-2">{t('cousins')}</h3>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfFullCousins')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={fullCousins}
                      onChange={(e) => handleNumberChange('fullCousins', e.target.value, setFullCousins)}
                      onBlur={() => { markTouched('fullCousins'); validateNumber('fullCousins', fullCousins, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.fullCousins ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('fullCousins')}
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A4A4A]">{t('numberOfPaternalCousins')}:</label>
                    <input
                      type="number"
                      min={0}
                      value={paternalCousins}
                      onChange={(e) => handleNumberChange('paternalCousins', e.target.value, setPaternalCousins)}
                      onBlur={() => { markTouched('paternalCousins'); validateNumber('paternalCousins', paternalCousins, { min: 0 }); }}
                      className={`w-full border rounded px-3 py-2 ${errors.paternalCousins ? 'border-red-400' : 'border-[#E8BCA8]'}`}
                    />
                    {renderError('paternalCousins')}
                  </div>
                </div>
              </>
            )}
          </div>

        {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 pt-4 border-t border-dashed border-[#E8BCA8]">
            <button
              className="w-full sm:w-auto bg-[#4A4A4A] text-white px-5 py-2 rounded-md hover:bg-[#DB8D73] transition shadow-sm text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleCalculate}
              disabled={estateAmount !== "" && !isEstateAmountValid}
            >
              {t('calculate')}
            </button>
            <button
              className="w-full sm:w-auto bg-[#E3A48E] text-white px-5 py-2 rounded-md hover:bg-[#DB8D73] transition shadow-sm text-sm sm:text-base"
              onClick={handleReset}
            >
              {t('reset')}
            </button>
            {result && (
              <button
                className="w-full sm:w-auto bg-[#DC9B83] text-white px-5 py-2 rounded-md hover:bg-[#B9745B] transition shadow-sm text-sm sm:text-base"
                onClick={handlePrint}
              >
                {t('printResult')}
              </button>
            )}
          </div>

          {/* Results */}
        {result && (
  <div className="mt-8 bg-[#FAFAFA] border border-[#E8BCA8] rounded p-4">
            <h2 className="text-2xl font-semibold text-[#DC9B83] mb-2">
              {t('calculationResult')}
            </h2>
            <p className="text-xs text-[#7A7A7A] mb-3">
              {(t('currentMadhhab') || 'Current madhhab') + ': '}
                  <span className="font-semibold text-[#4A4A4A]">
                {madhhab === "hanafi"
                  ? t('hanafi') || 'Hanafi'
                  : madhhab === "shafii"
                  ? t('shafii') || "Shafi'i"
                  : madhhab === "maliki"
                  ? t('maliki') || 'Maliki'
                  : t('hanbali') || 'Hanbali'}
                  </span>
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#E8BCA8] text-sm">
                <thead className="bg-[#FFFFFF]">
                  <tr>
                    <th className="border border-[#E8BCA8] px-3 py-2 text-left text-[#4A4A4A]">
                      {t('heir')}
                    </th>
                    <th className="border border-[#E8BCA8] px-3 py-2 text-left text-[#4A4A4A]">
                      {t('wholeShare')}
                    </th>
                    <th className="border border-[#E8BCA8] px-3 py-2 text-left text-[#4A4A4A]">
                      {t('eachShare')}
                    </th>
                    <th className="border border-[#E8BCA8] px-3 py-2 text-left text-[#4A4A4A]">
                      {t('wholeAmount')}
                    </th>
                    <th className="border border-[#E8BCA8] px-3 py-2 text-left text-[#4A4A4A]">
                      {t('eachAmount')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const rows = [];

                    const pushRow = (label, totalShare, eachShare, note) => {
                      if (!totalShare || totalShare <= 0) return;
                      const percentage = (totalShare * 100).toFixed(2) + '%';
                      const eachPercentage =
                        eachShare && eachShare > 0
                          ? (eachShare * 100).toFixed(2) + '%'
                          : '';

                      const totalAmount =
                        isEstateAmountValid && estateAmount
                          ? formatMoney(totalShare * Number(estateAmount))
                          : '';
                      const eachAmount =
                        isEstateAmountValid &&
                        estateAmount &&
                        eachPercentage !== ''
                          ? formatMoney(eachShare * Number(estateAmount))
                          : '';

                      rows.push(
                        <tr key={label}>
                          <td className="border border-[#E8BCA8] px-3 py-2 text-[#4A4A4A]">
                            <div className="flex flex-col">
                              <span>{label}</span>
                              {note && (
                                <span className="text-[10px] text-[#9A9A9A]">
                                  {note}
                  </span>
                              )}
                </div>
                          </td>
                          <td className="border border-[#E8BCA8] px-3 py-2 text-[#4A4A4A]">
                            {percentage}
                          </td>
                          <td className="border border-[#E8BCA8] px-3 py-2 text-[#4A4A4A]">
                            {eachPercentage || '-'}
                          </td>
                          <td className="border border-[#E8BCA8] px-3 py-2 text-[#4A4A4A]">
                            {totalAmount || '-'}
                          </td>
                          <td className="border border-[#E8BCA8] px-3 py-2 text-[#4A4A4A]">
                            {eachAmount || '-'}
                          </td>
                        </tr>
                      );
                    };

                    const namedRelations = new Set(
                      namedHeirs
                        .filter((h) => h.relation)
                        .map((h) => h.relation)
                    );

                    // Spouses
                    if (wives > 0 && !namedRelations.has("wife")) {
                      const label =
                        wives > 1 ? `${t('wives')} (${wives})` : t('wife');
                      pushRow(label, result.wives, result.wivesEach);
                    }
                    if (husbandAlive && !namedRelations.has("husband")) {
                      pushRow(t('husband'), result.husband, null);
                    }

                    // Children
                    if (sons > 0 && !namedRelations.has("son")) {
                      const label =
                        sons > 1 ? `${t('sons')} (${sons})` : t('son');
                      pushRow(label, result.sons, result.sonsEach);
                    }
                    if (daughters > 0 && !namedRelations.has("daughter")) {
                      const label =
                        daughters > 1
                          ? `${t('daughters')} (${daughters})`
                          : t('daughter');
                      pushRow(label, result.daughters, result.daughtersEach);
                    }

                    // Parents
                    if (motherAlive && !namedRelations.has("mother")) {
                      pushRow(t('mother'), result.mother, null);
                    }
                    if (fatherAlive && !namedRelations.has("father")) {
                      pushRow(t('father'), result.father, null);
                    }

                    // Full siblings
                    if (brothers > 0 && !namedRelations.has("brother")) {
                      const label =
                        brothers > 1
                          ? `${t('brothers')} (${brothers})`
                          : t('brother');
                      pushRow(label, result.brothers, result.brothersEach);
                    }
                    if (sisters > 0 && !namedRelations.has("sister")) {
                      const label =
                        sisters > 1
                          ? `${t('sisters')} (${sisters})`
                          : t('sister');
                      pushRow(label, result.sisters, result.sistersEach);
                    }

                    // Grandchildren
                    if (grandsons > 0) {
                      const label =
                        grandsons > 1
                          ? `${t('grandsons')} (${grandsons})`
                          : t('grandson');
                      pushRow(label, result.grandsons, result.grandsonsEach);
                    }
                    if (granddaughters > 0) {
                      const label =
                        granddaughters > 1
                          ? `${t('granddaughters')} (${granddaughters})`
                          : t('granddaughter');
                      pushRow(
                        label,
                        result.granddaughters,
                        result.granddaughtersEach
                      );
                    }

                    // Grandparents
                    if (grandfatherAlive) {
                      pushRow(t('grandfather'), result.grandfather, null);
                    }
                    if (maternalGrandmotherAlive) {
                      pushRow(
                        t('maternalGrandmother'),
                        result.maternalGrandmother,
                        null
                      );
                    }
                    if (paternalGrandmotherAlive) {
                      pushRow(
                        t('paternalGrandmother'),
                        result.paternalGrandmother,
                        null
                      );
                    }

                    // Maternal siblings
                    if (maternalBrothers > 0) {
                      const label =
                        maternalBrothers > 1
                          ? `${t('maternalBrothers')} (${maternalBrothers})`
                          : t('maternalBrother');
                      pushRow(
                        label,
                        result.maternalBrothers,
                        result.maternalBrothersEach
                      );
                    }
                    if (maternalSisters > 0) {
                      const label =
                        maternalSisters > 1
                          ? `${t('maternalSisters')} (${maternalSisters})`
                          : t('maternalSister');
                      pushRow(
                        label,
                        result.maternalSisters,
                        result.maternalSistersEach
                      );
                    }

                    // Paternal siblings
                    if (paternalBrothers > 0) {
                      const label =
                        paternalBrothers > 1
                          ? `${t('paternalBrothers')} (${paternalBrothers})`
                          : t('paternalBrother');
                      pushRow(
                        label,
                        result.paternalBrothers,
                        result.paternalBrothersEach
                      );
                    }
                    if (paternalSisters > 0) {
                      const label =
                        paternalSisters > 1
                          ? `${t('paternalSisters')} (${paternalSisters})`
                          : t('paternalSister');
                      pushRow(
                        label,
                        result.paternalSisters,
                        result.paternalSistersEach
                      );
                    }

                    // Nephews
                    if (fullNephews > 0) {
                      const label =
                        fullNephews > 1
                          ? `${t('fullNephews')} (${fullNephews})`
                          : t('fullNephew');
                      pushRow(
                        label,
                        result.fullNephews,
                        result.fullNephewsEach
                      );
                    }
                    if (paternalNephews > 0) {
                      const label =
                        paternalNephews > 1
                          ? `${t('paternalNephews')} (${paternalNephews})`
                          : t('paternalNephew');
                      pushRow(
                        label,
                        result.paternalNephews,
                        result.paternalNephewsEach
                      );
                    }

                    // Uncles
                    if (fullUncles > 0) {
                      const label =
                        fullUncles > 1
                          ? `${t('fullUncles')} (${fullUncles})`
                          : t('fullUncle');
                      pushRow(
                        label,
                        result.fullUncles,
                        result.fullUnclesEach
                      );
                    }
                    if (paternalUncles > 0) {
                      const label =
                        paternalUncles > 1
                          ? `${t('paternalUncles')} (${paternalUncles})`
                          : t('paternalUncle');
                      pushRow(
                        label,
                        result.paternalUncles,
                        result.paternalUnclesEach
                      );
                    }

                    // Cousins
                    if (fullCousins > 0) {
                      const label =
                        fullCousins > 1
                          ? `${t('fullCousins')} (${fullCousins})`
                          : t('fullCousin');
                      pushRow(
                        label,
                        result.fullCousins,
                        result.fullCousinsEach
                      );
                    }
                    if (paternalCousins > 0) {
                      const label =
                        paternalCousins > 1
                          ? `${t('paternalCousins')} (${paternalCousins})`
                          : t('paternalCousin');
                      pushRow(
                        label,
                        result.paternalCousins,
                        result.paternalCousinsEach
                      );
                    }

                    // Baytulmal (public treasury)
                    if (result.baytulmal && result.baytulmal > 0) {
                      pushRow(t('baytulmal'), result.baytulmal, null);
                    }

                    // Named heirs rows (including blocked explanations)
                    const relationConfig = {
                      daughter: {
                        count: daughters,
                        shareKey: "daughters",
                        eachKey: "daughtersEach",
                        label: t("daughter"),
                      },
                      son: {
                        count: sons,
                        shareKey: "sons",
                        eachKey: "sonsEach",
                        label: t("son"),
                      },
                      father: {
                        count: fatherAlive ? 1 : 0,
                        shareKey: "father",
                        eachKey: null,
                        label: t("father"),
                      },
                      mother: {
                        count: motherAlive ? 1 : 0,
                        shareKey: "mother",
                        eachKey: null,
                        label: t("mother"),
                      },
                      wife: {
                        count: wives,
                        shareKey: "wives",
                        eachKey: "wivesEach",
                        label: t("wife"),
                      },
                      husband: {
                        count: husbandAlive ? 1 : 0,
                        shareKey: "husband",
                        eachKey: null,
                        label: t("husband"),
                      },
                      brother: {
                        count: brothers,
                        shareKey: "brothers",
                        eachKey: "brothersEach",
                        label: t("brother"),
                      },
                      sister: {
                        count: sisters,
                        shareKey: "sisters",
                        eachKey: "sistersEach",
                        label: t("sister"),
                      },
                    };

                    namedHeirs
                      .filter((h) => h.name && h.relation)
                      .forEach((h) => {
                        const cfg = relationConfig[h.relation];
                        if (!cfg) return;
                        const groupShare = result[cfg.shareKey] || 0;
                        const count = cfg.count || 0;

                        if (count === 0 || groupShare <= 0) {
                          // Selected in form but got no share
                          pushRow(
                            `${h.name} (${cfg.label})`,
                            0.000001, // tiny amount so we can show ~0%
                            null,
                            t('blockedByCloserHeirs') ||
                              "No share: blocked by closer heirs according to Sharia rules."
                          );
                          return;
                        }

                        let eachShare = null;
                        if (cfg.eachKey && result[cfg.eachKey] > 0) {
                          eachShare = result[cfg.eachKey];
                        } else if (groupShare > 0 && count > 0) {
                          eachShare = groupShare / count;
                        }

                        if (!eachShare || eachShare <= 0) {
                          pushRow(
                            `${h.name} (${cfg.label})`,
                            0.000001,
                            null,
                            t('blockedByCloserHeirs') ||
                              "No share: blocked by closer heirs according to Sharia rules."
                          );
                        } else {
                          pushRow(
                            `${h.name} (${cfg.label})`,
                            eachShare,
                            eachShare,
                            null
                          );
                        }
                      });

                    return rows;
                  })()}
                </tbody>
              </table>
                </div>
            {/* Summary line */}
            <div className="mt-3 text-xs text-[#4A4A4A]">
              {(() => {
                const distributedTotal = Object.entries(result)
                  .filter(
                    ([key]) =>
                      key !== "baytulmal" && !key.toLowerCase().includes("each")
                  )
                  .reduce(
                    (sum, [, val]) =>
                      sum + (typeof val === "number" ? val : 0),
                    0
                  );
            return (
                  <p>
                    {(t('totalSharesSummary') || 'Total of all shares') + ': '}
                    <span className="font-semibold">
                      {(distributedTotal * 100).toFixed(2)}%
                </span>
                    {isEstateAmountValid && (
                      <>
                        {' '}
                        · {(t('totalEstateUsed') || 'Total estate used') + ': '}
                        <span className="font-semibold">
                          {formatMoney(Number(estateAmount))}
                </span>
                      </>
                    )}
                  </p>
            );
      })()}
    </div>
  </div>
)}

        </div>

        


            {/* RIGHT - Tips Panel */}
          <div className="flex-1 bg-[#FFFFFF] border border-[#E8BCA8] rounded-lg shadow-md p-6 min-w-[260px] sm:min-w-[280px] max-w-full lg:max-w-[320px] text-[#4A4A4A] overflow-y-auto max-h-[calc(90vh)]">
            <h2 className="text-2xl font-semibold text-[#DC9B83] mb-4">{t('qualificationAndTips')}</h2>
           <ul className="list-disc list-inside space-y-2 text-sm">
            <li>{t('selectOnlyTheHeirsWhoAreAliveAtTheTimeOfDeath')}</li>
            <li>{t('onlyOneOfHusbandOrWivesCanBeSelected')}</li>
            <li>{t('enterExactNumbersForEachHeir')}</li>
            <li>{t('leaveEstateAmountBlankToCalculateByPercentage')}</li>
            <li>{t('grandchildrenInheritOnlyIfTheirParentIsDeceased')}</li>
            <li>{t('granddaughtersGetFixedSharesIfNoGrandsonsExist')}</li>
            <li>{t('granddaughtersBlockSiblingsUnclesNephewsCousinsAndGrandfather')}</li>
            <li>{t('fatherOrMotherMayBlockSiblingsAndGrandparents')}</li>
            <li>{t('useSiblingsOnlyIfThereAreNoSonsGrandsonsOrFather')}</li>
            <li>{t('useGrandparentsOnlyIfThereAreNoParentsChildrenOrSiblings')}</li>
            <li>{t('consultAScholarForComplexOrDisputedCases')}</li>
            <li>{t('maternalBrothersAndSistersShare⅙CollectivelyIfNoParentsChildrenGrandchildrenOrFullSiblings')}</li>
            <li>{t('paternalBrothersAndSistersInheritResidueIfNoFatherChildrenOrFullSiblingsBrothersGetDoubleTheShareOfSisters')}</li>
            <li>{t('fullNephewsInheritOnlyIfTheDeceasedSonsAreNotAlive')}</li>
            <li>{t('paternalNephewsInheritOnlyIfSonsAndFullNephewsAreAbsent')}</li>
            <li>{t('fullUnclesInheritOnlyIfTheFatherIsDeceasedAndNoChildrenExist')}</li>
            <li>{t('grandfatherBlocksFullUnclesFromInheriting')}</li>
            <li>{t('paternalUnclesInheritOnlyIfFatherFullUnclesAndChildrenAreAbsent')}</li>
            <li>{t('maternalUnclesDoNotBlockOrGetBlockedByPaternalUnclesOrBrothers')}</li>
            <li>{t('presenceOfFatherSonsOrGrandfatherCanBlockNephewsAndUnclesAccordingToShariahRules')}</li>
            <li>{t('consultAQualifiedIslamicScholarForComplexOrDisputedInheritanceCases')}</li>
            <li>{t('fullCousinsInheritOnlyIfTheirCommonAncestor')} (e.g., {t('grandparent')}) {t('isDeceased')} {t('andNoCloserHeirsExist')}</li>
            <li>{t('paternalCousinsInheritOnlyIfFatherFullUnclesAndFullCousinsAreAbsent')}</li>
            <li>{t('cousinsTypicallyInheritAsDistantKindredDhawuAlArhamAndHaveLimitedSharesUnderIslamicInheritance')}</li>
            <li>{t('presenceOfCloserHeirsLikeSiblingsUnclesOrGrandparentsUsuallyBlocksCousinsFromInheriting')}</li>
            <li>{t('consultAQualifiedIslamicScholarForPreciseRulingsOnCousinInheritanceAsInterpretationsVary')}</li>
          </ul>
        </div>
      </div>
    </div>

    
  );
};

export default HeirFormSection1;
