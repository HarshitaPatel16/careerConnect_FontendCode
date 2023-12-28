import React from "react";
import { Card, CardContent, Typography } from '@mui/material';



function SidebarRight() {
    return (
        <div className="SidebarRight">
            <div style={{ marginRight: 'auto', width: '300px' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Left Sidebar Card
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            This card is positioned on the right side.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SidebarRight;
