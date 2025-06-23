import { columnsViewDefinition } from "../src/transform";

const definitions = [
  "  create view vCode  as      select      dCode.Identifier,      dCode.CodeSequence, dCode.CodeCategory, dCode.CodeValue, dCode.CodeFlags, dCode.CodeLink,       dCode.CodeInteger, dCode.CodeFloat, dCode.CodeDate, dCode.CodeString    from     dCode    where     dCode.Identifier <> 0  ",
  "CREATE VIEW dbo.vStockInfo  AS  SELECT        s.Identifier, p.UPC, s.Serial, p.Description, s.OrigWeight, ad.AddressName, s.IdentOrder, s.LoadDate, o.ShipDate, sto.StorageName, st.StationName, s.Rebox, s.Void, s.PackDate, s.UploadDate, s.Note, s.Source, CONVERT(Date,                            s.Maintenance) AS Maintenance  FROM            dbo.dStock AS s LEFT OUTER JOIN                           dbo.dProduct AS p ON s.IdentProduct = p.Identifier LEFT OUTER JOIN                           dbo.dStorage AS sto ON s.IdentStorage = sto.Identifier LEFT OUTER JOIN                           dbo.dOrder AS o ON s.IdentOrder = o.Identifier LEFT OUTER JOIN                           dbo.dAddress AS ad ON o.IdentAddressLocation = ad.Identifier LEFT OUTER JOIN                           dbo.dStation AS st ON s.IdentStation = st.Identifier  ",
  "  create view vControlRecord  as      select      dControl.Identifier,      dControl.SiteName, dControl.SerialNumber, dControl.Subscription,      dControl.Name, dControl.Plant, dControl.PlantType, dControl.PlantID, dControl.CFN, dControl.FDA, dControl.GS1, dControl.BranchWO, dControl.BranchTran,      dControl.AirPort, dControl.Timeout,      dControl.SortFile, dControl.ShipFile, dControl.ShipAccount, dControl.PortName,      dControl.IdentAddressLocation, dControl.IdentAddressBill, dControl.IdentAddressShip, dControl.Season,      dControl.SerialNext, dControl.PalletNext, dControl.ERPNext, dControl.BLNext,      dControl.SerialLength, dControl.PalletLength, dControl.PalletWeight, dControl.BoxWeight, dControl.TierSize, dControl.SerialTare,      dControl.Interval, dControl.Frequency, dControl.Location, dControl.DatePref, dControl.ReboxPref, dControl.ReboxMethod,      dControl.Password, dControl.SelfStrip, dControl.Palletize, dControl.PalletDups, dControl.AutoProc, dControl.AddScanned, dControl.PrepDate,       dControl.Reindex, dControl.ColdStore, dControl.Depth, dControl.Julian, dControl.Metric, dControl.Network, dControl.Mail, dControl.FTP,        dbo.fAddressBlock(dControl.IdentAddressLocation, 'N12LP') AddressBlockLocation,      dbo.fAddressBlock(dControl.IdentAddressBill, 'N12LP') AddressBlockBill,      dbo.fAddressBlock(dControl.IdentAddressShip, 'N12LP') AddressBlockShip      from      dControl    where      dControl.Identifier <> 0  ",
  "CREATE VIEW dbo.vOrderInfo  AS  SELECT        o.Identifier, o.OrderNumber, ad.AddressName, o.Creation, o.LoadDate, o.ShipDate, oc.Status, o.IdentAddressLocation AS IdentAddress  FROM            dbo.dAddress AS ad RIGHT OUTER JOIN                           dbo.dOrder AS o ON ad.Identifier = o.IdentAddressLocation LEFT OUTER JOIN                           dbo.dOrderComplete AS oc ON o.Identifier = oc.IdentOrder  ",
];

test("Prueba de obtención de las columnas de la definición de la vista", () => {
  try {
    definitions.forEach((definition) => {
      columnsViewDefinition(definition);
    });
  } catch (error) {
    fail(error);
  }
});
