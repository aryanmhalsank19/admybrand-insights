import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Table } from "lucide-react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ExportUtilsProps {
  data: any[];
  dashboardRef?: React.RefObject<HTMLDivElement>;
}

export function ExportUtils({ data, dashboardRef }: ExportUtilsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const csvData = data.map(item => ({
    'Campaign Name': item.name,
    'Channel': item.channel,
    'Clicks': item.clicks,
    'CTR (%)': item.ctr,
    'Spend ($)': item.spend,
    'Conversions': item.conversions,
    'Revenue ($)': item.revenue,
    'Status': item.status
  }));

  const exportToPDF = async () => {
    if (!dashboardRef?.current) {
      toast({
        title: "Export Error",
        description: "Dashboard reference not found.",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // landscape orientation
      
      const imgWidth = 280;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10;

      // Add title
      pdf.setFontSize(20);
      pdf.text('ADmyBRAND Insights - Dashboard Report', 15, 15);
      
      // Add date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 25);

      position = 35;

      pdf.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('admybrand-dashboard.pdf');
      
      toast({
        title: "Export Successful",
        description: "Dashboard exported to PDF successfully.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export dashboard to PDF.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CSVLink data={csvData} filename="campaigns.csv">
            <Button variant="outline" className="w-full justify-start">
              <Table className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CSVLink>
          
          <Button 
            variant="outline" 
            onClick={exportToPDF}
            disabled={isExporting}
            className="w-full justify-start"
          >
            <FileText className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Export your campaign data and dashboard overview for reporting and analysis.
        </p>
      </CardContent>
    </Card>
  );
}