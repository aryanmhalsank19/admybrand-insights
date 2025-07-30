import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, 
  Search, 
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CSVLink } from "react-csv";

interface Campaign {
  id: number;
  name: string;
  channel: string;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  revenue: number;
  status: 'active' | 'paused' | 'completed';
}

interface CampaignTableProps {
  data: Campaign[];
}

type SortField = keyof Campaign;
type SortDirection = 'asc' | 'desc';

export function CampaignTable({ data }: CampaignTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(campaign =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [data, searchQuery, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const csvData = filteredAndSortedData.map(campaign => ({
    'Campaign Name': campaign.name,
    'Channel': campaign.channel,
    'Clicks': campaign.clicks,
    'CTR (%)': campaign.ctr,
    'Spend ($)': campaign.spend,
    'Conversions': campaign.conversions,
    'Revenue ($)': campaign.revenue,
    'Status': campaign.status
  }));

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      paused: "bg-warning/10 text-warning border-warning/20",
      completed: "bg-muted text-muted-foreground border-border"
    };
    
    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="border-0 bg-gradient-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-semibold">Campaign Performance</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <CSVLink data={csvData} filename="campaigns.csv">
              <Button variant="outline" size="sm" className="export-button">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CSVLink>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {[
                  { field: 'name' as SortField, label: 'Campaign' },
                  { field: 'channel' as SortField, label: 'Channel' },
                  { field: 'clicks' as SortField, label: 'Clicks' },
                  { field: 'ctr' as SortField, label: 'CTR' },
                  { field: 'spend' as SortField, label: 'Spend' },
                  { field: 'conversions' as SortField, label: 'Conversions' },
                  { field: 'revenue' as SortField, label: 'Revenue' },
                  { field: 'status' as SortField, label: 'Status' }
                ].map(({ field, label }) => (
                  <TableHead key={field}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium"
                      onClick={() => handleSort(field)}
                    >
                      {label}
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.channel}</TableCell>
                  <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell>{campaign.ctr.toFixed(1)}%</TableCell>
                  <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                  <TableCell>{campaign.conversions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">
                    ${campaign.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndSortedData.length)} of {filteredAndSortedData.length} campaigns
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}